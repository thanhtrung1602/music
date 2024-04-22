const express = require('express');
const authController = require('../app/controllers/AuthController.js');
const router = express.Router();

// GET REGISTER
router.get('/register_', authController.getRegister)

// GET LOGIN
router.get('/login_', authController.getLogin)

//  REGISTER
router.post('/register', authController.register);

//  LOGIN
router.post('/login', authController.login)

module.exports = router;
