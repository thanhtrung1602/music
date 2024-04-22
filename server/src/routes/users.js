const express = require('express');
const usersController = require('../app/controllers/UsersController.js');
const router = express.Router();

router.get('/', usersController.getAllUser);

module.exports = router;
