const express = require('express');
const usersController = require('../app/controllers/UsersController.js');
const { authenToken }= require('../middleware/authenToken.js');
const { route } = require('./track.js');
const router = express.Router();

router.get('/renderSearch', usersController.renderSearch)

router.get('/getOneUser/:key', usersController.getOneUser)

router.get('/userLog', usersController.getTokenUser);

router.get('/', authenToken, usersController.getUser);

module.exports = router;
