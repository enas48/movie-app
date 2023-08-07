const express = require("express");
const router = express.Router();
const {
  getProfiles,
  getProfileByUserId,
  createProfile,
  getProfileById,
  updatedProfile,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getProfiles)
  .post(protect, createProfile);
router
  .route("/:id")
  .get(getProfileById)
  .put( protect, updatedProfile);
  router
  .route("/users/:userid")
  .get(getProfileByUserId);


module.exports = router;
