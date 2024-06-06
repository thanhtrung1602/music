const commentService = require("../../service/commentService");

class CommentController {
  async getCommentTrackCount(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const amountCommentTrack = await commentService.getCommentTrackCount(id);
      return res.json(amountCommentTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getAllCommentTrack(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const getAllCommentTrack = await commentService.getAllCommentTrack(id);
      return res.status(200).json(getAllCommentTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async postCommentTrack(req, res) {
    const { id, title, track_id, user_id } = req.body;
    try {
      if (!title || !track_id || !user_id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const postCommentTrack = await commentService.postCommentTrack(req.body);
      return res.status(200).json(postCommentTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async likeComment(req, res) {
    const { comment_id, user_id } = req.body;
    try {
      if (!comment_id || !user_id) {
        return res.status(400).json({ EM: "Missing", EC: "-1", DT: "" });
      }
      const likeComment = await commentService.likeCommentService(req.body);
      return res.status(200).json(likeComment);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async replyComment(req, res) {
    const { reply, comment_id, user_id } = req.body;
    try {
      if (!reply || !comment_id || !user_id) {
        return res.status(400).json({
          EM: "missing",
          EC: "-1",
          DT: "",
        });
      }
      const replyComment = await commentService.replyComment(req.body);
      return res.status(200).json(replyComment);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }
}

module.exports = new CommentController();
