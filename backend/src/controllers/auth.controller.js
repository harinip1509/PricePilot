const { authenticateUser, createUser } = require("../services/user.service");
const { signToken } = require("../utils/token");

function validateSignupPayload(body) {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    const error = new Error("Name, email, and password are required.");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters.");
    error.statusCode = 400;
    throw error;
  }
}

function validateLoginPayload(body) {
  const { email, password } = body;

  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.statusCode = 400;
    throw error;
  }
}

async function signup(req, res, next) {
  try {
    validateSignupPayload(req.body);
    const user = await createUser(req.body);
    const token = signToken(user);

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    validateLoginPayload(req.body);
    const user = await authenticateUser(req.body.email, req.body.password);
    const token = signToken(user);

    res.json({
      message: "Login successful.",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
}

function logout(_req, res) {
  res.json({
    message: "Logout successful on client side. Remove the stored token to finish signing out.",
  });
}

function refresh(req, res) {
  const token = signToken(req.user);

  res.json({
    message: "Token refreshed successfully.",
    token,
    user: req.user,
  });
}

module.exports = {
  login,
  logout,
  refresh,
  signup,
};
