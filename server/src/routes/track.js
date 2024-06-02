const express = require('express');
const trackController = require('../app/controllers/TrackController.js');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();

router.get('/getGenre', trackController.getGenre)

router.get('/getTrackPlaylist/:id', trackController.getTrackPlaylist)

router.get('/getPlaylist/:id', trackController.getPlaylist)

router.post('/addPlaylist', trackController.addPlaylist)

router.post('/createPlaylist', trackController.createPlaylist)

router.post('/createAlbums', trackController.createAlbums)

router.post('/postListen/', trackController.postListen);

router.get('/getAllListen/:id', trackController.getAllListen)

router.delete('/unLikeTrack/:trackId/:userId', trackController.unLikeTrack);

router.post('/likeTrack/', trackController.likeTrack);

router.get('/getAllLikeTrack/:id', trackController.getAllLikeTrack);

router.get('/getOneTrack/:id', trackController.getOneTrack);

router.get('/getTrackGenre/:id', trackController.getTrackGenre)

router.get('/getTrackCount/:id', trackController.getTrackCount);

router.get('/getTrack/:id', trackController.getTrackUser);

router.get('/getAllTrack', trackController.getAllTrack);

router.post('/uploader', uploadCloud.fields([
    {name: 'sound', maxCount: 1},
    {name:  'image', maxCount: 1}
]), trackController.upload);

router.get('/', trackController.viewTrack);

module.exports = router;
