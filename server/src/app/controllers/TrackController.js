const trackService = require("../../service/trackService");
const db = require("../../models/index");

class TrackController {
  viewTrack(req, res) {
    res.render("track");
  }

  async upload(req, res) {
    const fileSound = req.files["sound"]?.[0].path;
    const fileImage = req.files["image"]?.[0].path;
    const { track_name, description, user_id, category_id, genre_id } =
      req.body;

    try {
      if (!track_name || !user_id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      if (!fileSound || !fileImage) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const track = await trackService.upload(
        { track_name, description, user_id, category_id, genre_id },
        fileSound,
        fileImage
      );
      return res.status(200).json(track);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ EM: "Server error", EC: "-1", DT: "" });
    }
  }

  async getTrackUser(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const track = await trackService.getTrackUser(id);
      return res.status(200).json(track);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getTrackCount(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const amountTrack = await trackService.getTrackCount(id);
      return res.json(amountTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getAllTrack(req, res) {
    try {
      const getAllTrack = await trackService.getAllTrack();
      return res.status(200).json(getAllTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getOneTrack(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const getOneTrack = await trackService.getOneTrack(id);
      return res.status(200).json(getOneTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async likeTrack(req, res) {
    const { track_id, user_id } = req.body;
    try {
      if (!track_id || !user_id) {
        return res.status(400).json({
          EM: "missing",
          EC: "-1",
          DT: "",
        });
      }
      const likeTrack = await trackService.likeTrack(req.body);
      return res.status(200).json(likeTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async unLikeTrack(req, res) {
    const trackId = req.params.trackId;
    const userId = req.params.userId;
    try {
      if (!trackId || !userId) {
        return res.status(400).json({
          EM: "missing",
          EC: "-1",
          DT: "",
        });
      }
      const unLikeTrack = await trackService.unLikeTrack(trackId, userId);
      return res.status(200).json(unLikeTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getAllLikeTrack(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const getAllLikeTrack = await trackService.getAllLikeTrack(id);
      return res.status(200).json(getAllLikeTrack);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getAllListen(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const getAllListening = await trackService.getAllListen(id);
      return res.status(200).json(getAllListening);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async postListen(req, res) {
    const { track_id, user_id } = req.body;
    try {
      if (!track_id || !user_id) {
        return res.status(400).json({
          EM: "missing",
          EC: "-1",
          DT: "",
        });
      }
      const postListen = await trackService.postListen(req.body);
      return res.status(200).json(postListen);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async createAlbums(req, res) {
    const { album_name, image, user_id } = req.body;
    try {
      if (!album_name || !user_id || !image) {
        return res.status(400).json({
          EM: "missing",
          EC: "-1",
          DT: "",
        });
      }
      const createAlbums = await trackService.createAlbums(req.body);
      return res.status(200).json(createAlbums);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async createPlaylist(req, res) {
    const { playlist_name, image, user_id } = req.body;
    try {
      if (!playlist_name || !user_id || !image) {
        return res.status(400).json({
          EM: "missing",
          EC: "-1",
          DT: "",
        });
      }
      const createPlaylist = await trackService.createPlaylist(req.body);
      return res.status(200).json(createPlaylist);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async addPlaylist(req, res) {
    const { playlist_id, track_id } = req.body;
    try {
      if (!playlist_id || !track_id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const addPlaylist = await trackService.addPlaylist(req.body);
      return res.status(200).json(addPlaylist);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getPlaylist(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const getPlaylist = await trackService.getPlaylist(id);
      return res.status(200).json(getPlaylist);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getTrackPlaylist(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const getTrackPlaylist = await trackService.getTrackPlaylist(id);
      return res.status(200).json(getTrackPlaylist);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getGenre(req, res) {
    try {
      const getGenre = await trackService.getGenre();
      return res.status(200).json(getGenre);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async getTrackGenre(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).json({ EM: "missing", EC: "-1", DT: "" });
      }
      const getTrackGenre = await trackService.getTrackGenre(id);
      return res.status(200).json(getTrackGenre);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }

  async search(req, res) {
    const { query } = req.query;
    try {
      if (!query) {
        return res.status(404).json(null);
      }
      const search = await trackService.searchEveryThing(query);
      return res.status(200).json(search);
    } catch (error) {
      console.error(">>> co loi ", error);
      return res.status(500).json({ Error: ">>> co loi ", err: error.message });
    }
  }
}

module.exports = new TrackController();
