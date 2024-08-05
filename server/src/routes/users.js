const express = require("express");
const usersController = require("../app/controllers/UsersController.js");

const router = express.Router();

router.get("/getUserToken", usersController.getUserToken);

router.get("/getFollowing/:id", usersController.getFollowingUser);

router.get("/getFollower/:id", usersController.getFollowerUser);

router.get("/getCountFollowing/:id", usersController.followingUserCount);

router.get("/getCountFollower/:id", usersController.followerUserCount);

router.delete("/unFollow/", usersController.unFollow);

router.post("/following/", usersController.following);

router.get("/userLog", usersController.getTokenUser);

router.get("/getUserDetail/:id", usersController.getUserDetail);

router.get("/getAllUser", usersController.getAllUser);

module.exports = router;
