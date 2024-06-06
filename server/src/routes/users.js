const express = require('express');
const usersController = require('../app/controllers/UsersController.js');
const { authenToken }= require('../middleware/authenToken.js');
const router = express.Router();

// Số lượng người mà tôi đang theo dõi
router.get('/getFollowing/:id', usersController.getFollowingUser);

// Số lượng người đang theo dõi tôi
router.get('/getFollower/:id', usersController.getFollowerUser);

// Số lượng người mà tôi đang theo dõi
router.get('/getCountFollowing/:id', usersController.followingUserCount);

// Số lượng người đang theo dõi tôi
router.get('/getCountFollower/:id', usersController.followerUserCount);

router.post('/following/', usersController.following)

router.get('/userLog', usersController.getTokenUser);

router.get('/getUserDetail/:id', usersController.getUserDetail);

router.get('/getAllUser',authenToken, usersController.getAllUser);

module.exports = router;
