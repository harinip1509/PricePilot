const express = require("express");
const { getProfile, patchProfile } = require("../controllers/user.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/profile", requireAuth, getProfile);
router.patch("/profile", requireAuth, patchProfile);

module.exports = router;
