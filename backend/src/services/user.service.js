const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { readUsers, writeUsers } = require("../utils/fileDb");

function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

async function findUserById(id) {
  const users = await readUsers();
  return users.find((user) => user.id === id) || null;
}

async function createUser({ name, email, password }) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("An account with this email already exists.");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const users = await readUsers();
  const now = new Date().toISOString();

  const user = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    passwordHash,
    phone: "",
    businessName: "",
    industry: "",
    currency: "USD",
    timezone: "UTC",
    createdAt: now,
    updatedAt: now,
  };

  users.push(user);
  await writeUsers(users);

  return sanitizeUser(user);
}

async function authenticateUser(email, password) {
  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid credentials.");
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    const error = new Error("Invalid credentials.");
    error.statusCode = 401;
    throw error;
  }

  return sanitizeUser(user);
}

async function updateUserProfile(userId, updates) {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  if (
    typeof updates.email === "string" &&
    updates.email.trim() &&
    updates.email.toLowerCase() !== users[index].email.toLowerCase()
  ) {
    const emailTaken = users.some(
      (user) => user.id !== userId && user.email.toLowerCase() === updates.email.toLowerCase(),
    );

    if (emailTaken) {
      const error = new Error("An account with this email already exists.");
      error.statusCode = 409;
      throw error;
    }
  }

  const allowedUpdates = ["name", "email", "phone", "businessName", "industry", "currency", "timezone"];
  const nextUser = { ...users[index] };

  for (const key of allowedUpdates) {
    if (Object.prototype.hasOwnProperty.call(updates, key)) {
      nextUser[key] = key === "email" && typeof updates[key] === "string"
        ? updates[key].toLowerCase()
        : updates[key];
    }
  }

  nextUser.updatedAt = new Date().toISOString();
  users[index] = nextUser;
  await writeUsers(users);

  return sanitizeUser(nextUser);
}

module.exports = {
  authenticateUser,
  createUser,
  findUserByEmail,
  findUserById,
  sanitizeUser,
  updateUserProfile,
};
