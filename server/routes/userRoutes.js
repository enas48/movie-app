const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  followUser,
  unfollowUser
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/user", getUser);
router.route("/follow/:id").put( followUser);
router.route("/unfollow/:id").put( unfollowUser);

module.exports = router;
 