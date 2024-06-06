const express = require('express');
const commentController = require('../app/controllers/CommentController.js');
const router = express.Router();

router.post('/replyComment/', commentController.replyComment)

router.post('/likeComment/', commentController.likeComment)

router.post('/postCommentTrack/', commentController.postCommentTrack);

router.get('/getCommentTrackCount/:id', commentController.getCommentTrackCount);

router.get('/getAllCommentTrack/:id', commentController.getAllCommentTrack);


module.exports = router;