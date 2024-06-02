const express = require('express');
const usersController = require('../app/controllers/UsersController.js');
const { authenToken }= require('../middleware/authenToken.js');
const router = express.Router();

router.get('/userLog', usersController.getTokenUser);

router.get('/getAllUser', usersController.getAllUser);

router.get('/getOneUserTrack/:id', usersController.getOneUserTrack);

router.get('/', authenToken, usersController.getUser);

module.exports = router;
