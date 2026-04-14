const { updateUserProfile } = require("../services/user.service");

function getProfile(req, res) {
  res.json({
    user: req.user,
  });
}

async function patchProfile(req, res, next) {
  try {
    const user = await updateUserProfile(req.user.id, req.body || {});

    res.json({
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  patchProfile,
};
