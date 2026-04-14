const { verifyToken } = require("../utils/token");
const { findUserById } = require("../services/user.service");

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is required." });
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const payload = verifyToken(token);
    const user = await findUserById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: "User account was not found." });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = {
  requireAuth,
};
