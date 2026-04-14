const express = require("express");
const { login, logout, refresh, signup } = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", requireAuth, refresh);

module.exports = router;
