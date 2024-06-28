const express = require("express");
const usersController = require("../app/controllers/UsersController.js");
const authController = require("../app/controllers/AuthController.js");

const router = express.Router();

router.get("/getCookie", authController.getCookie);

router.get("/getUserToken", usersController.getUserToken);

// tôi đang theo dõi
router.get("/getFollowing/:id", usersController.getFollowingUser);

// theo dõi tôi
router.get("/getFollower/:id", usersController.getFollowerUser);

// Số lượng người mà tôi đang theo dõi
router.get("/getCountFollowing/:id", usersController.followingUserCount);

// Số lượng người đang theo dõi tôi
router.get("/getCountFollower/:id", usersController.followerUserCount);

router.delete("/unFollow/", usersController.unFollow);

router.post("/following/", usersController.following);

router.get("/userLog", usersController.getTokenUser);

router.get("/getUserDetail/:id", usersController.getUserDetail);

router.get("/getAllUser", usersController.getAllUser);

module.exports = router;
