const express = require('express');
const trackController = require('../app/controllers/TrackController.js');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();

router.get('/getTrack/:id', trackController.getTrackUser)
router.post('/uploader', uploadCloud.single('sound'), trackController.upload);
router.get('/', trackController.viewTrack);
module.exports = router;
