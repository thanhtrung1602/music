const express = require('express');
const trackController = require('../app/controllers/TrackController.js');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();


router.post('/postCommentTrack/', trackController.postCommentTrack);

router.get('/getLikeTrackCount/:id', trackController.getLikeTrackCount);

router.get('/getCommentTrackCount/:id', trackController.getCommentTrackCount);

router.get('/getTrackCount/:id', trackController.getTrackCount);

router.get('/getTrack/:id', trackController.getTrackUser);

router.post('/uploader', uploadCloud.single('sound'), trackController.upload);

router.get('/', trackController.viewTrack);

module.exports = router;
