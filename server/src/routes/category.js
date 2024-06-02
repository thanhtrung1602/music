const express = require('express');
const categoryController = require('../app/controllers/CategoryController.js')
const router = express.Router();

router.get('/', categoryController.getAllCat);

module.exports = router;