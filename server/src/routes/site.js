const express = require('express');
const siteController = require('../app/controllers/SiteController.js');
var router = express.Router();

router.get('/:slug', siteController.statistic);
router.get('/', siteController.home);

module.exports = router;
