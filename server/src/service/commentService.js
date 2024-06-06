const db = require("../models/index");

async function getCommentTrackCount(id) {
  try {
    const amountCommentTrack = await db.Comment.count({
      where: {
        track_id: id,
      },
    });
    return { amountCommentTrack };
  } catch (error) {
    console.error("Error count Comment:", error);
    throw error;
  }
}

async function getAllCommentTrack(id) {
  try {
    const getAllCommentTrack = await db.Comment.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        track_id: id,
      },
      include: [
        {
          model: db.User,
          as: "userData",
        },
      ],
    });
    return { getAllCommentTrack };
  } catch (error) {
    console.error("Error findAll Comment:", error);
    throw error;
  }
}

async function postCommentTrack({ id, title, track_id, user_id }) {
  try {
    const postCommentTrack = await db.Comment.create({
      title,
      track_id,
      user_id,
    });
    return { postCommentTrack };
  } catch (error) {
    console.error("Error create Comment:", error);
    throw error;
  }
}

async function likeCommentService({ comment_id, user_id }) {
  try {
    const likeCommentResult = await db.LikeComment.findOrCreate({
      where: {
        comment_id,
        user_id,
      },
      defaults: {
        comment_id,
        user_id,
      },
    });
    return { likeCommentResult };
  } catch (error) {
    console.error("Error findOrCreate likeComment:", error);
    throw error;
  }
}

async function replyComment({ reply, comment_id, user_id }) {
  try {
    const replyComment = await db.ReplyComment.create({
      reply,
      comment_id,
      user_id,
    });
    return { replyComment };
  } catch (error) {
    console.error("Error create replyComment:", error);
    throw error;
  }
}

module.exports = {
  getCommentTrackCount,
  getAllCommentTrack,
  postCommentTrack,
  likeCommentService,
  replyComment,
};
