const userService = require("../../service/userService.js");
class UsersController {
  getTokenUser(req, res) {
    return res.render("user");
  }

  async getAllUser(req, res) {
    try {
      const user = await userService.getAllUser();
      return res.status(200).json(user);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getUserDetail(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const user = await userService.getUserDetail(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async following(req, res) {
    const { followerId, followingId } = req.body;
    try {
      if (!followerId || !followingId) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const follow = await userService.follows(req.body);
      return res.status(200).json(follow);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }
  // Số lượng người đang theo dõi tôi
  async followerUserCount(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const followerUser = await userService.followerUserCount(id);
      return res.status(200).json(followerUser);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }
  // Số lượng người mà tôi đang theo dõi
  async followingUserCount(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const followingUser = await userService.followingUserCount(id);
      return res.status(200).json(followingUser);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  // lấy người đang theo dõi tôi
  async getFollowerUser(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const followerUser = await userService.getFollowerUser(id);
      return res.status(200).json(followerUser);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }
  // lấy người mà tôi đang theo dõi
  async getFollowingUser(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const followingUser = await userService.getFollowingUser(id);
      return res.status(200).json(followingUser);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  getUserToken(req, res) {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(404).json("not found token!");
    }
    console.log(accessToken);
    return res.status(200).json(accessToken);
  }
}

module.exports = new UsersController();
