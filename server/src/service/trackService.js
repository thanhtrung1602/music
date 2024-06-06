const { Op } = require("sequelize");
const connect = require("../config/connect");
const db = require("../models/index");

async function upload(
  { track_name, description, user_id, category_id, genre_id },
  fileSound,
  fileImage
) {
  try {
    const track = await db.Track.create({
      track_name,
      sound: fileSound,
      image: fileImage,
      description,
      user_id,
      category_id,
      genre_id,
    });
    return { track };
  } catch (error) {
    console.error("Error creating new track:", error);
    throw error;
  }
}

async function getTrackUser(userId) {
  try {
    const track = await db.Track.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        user_id: userId,
      },
    });
    return { track };
  } catch (error) {
    console.error("Error findAll track:", error);
    throw error;
  }
}

async function getTrackCount(id) {
  try {
    const amountTrack = await db.Track.count({
      where: {
        user_id: id,
      },
    });
    return { amountTrack };
  } catch (error) {
    console.error("Error count track:", error);
    throw error;
  }
}

async function getAllTrack() {
  try {
    const getAllTrack = await db.Track.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "userData",
        },
      ],
    });
    return { getAllTrack };
  } catch (error) {
    console.error("Error count track:", error);
    throw error;
  }
}

async function getOneTrack(id) {
  try {
    const getOneTrack = await db.Track.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.User,
          as: "userData",
        },
      ],
    });
    return { getOneTrack };
  } catch (error) {
    console.error("Error findOne track:", error);
    throw error;
  }
}

async function likeTrack({ track_id, user_id }) {
  try {
    const likeTrack = await db.Like_track.findOrCreate({
      where: {
        track_id,
        user_id,
      },
      defaults: {
        track_id,
        user_id,
      },
    });
    return { likeTrack };
  } catch (error) {
    console.error("Error findOrCreate track:", error);
    throw error;
  }
}

async function unLikeTrack(trackId, userId) {
  try {
    const unLikeTrack = await db.Like_track.destroy({
      where: {
        track_id: trackId,
        user_id: userId,
      },
    });
    return { unLikeTrack };
  } catch (error) {
    console.error("Error destroy track:", error);
    throw error;
  }
}

async function getAllLikeTrack(id) {
  try {
    const getAllLikeTrack = await db.Like_track.count({
      where: {
        track_id: id,
      },
    });
    return { getAllLikeTrack };
  } catch (error) {
    console.error("Error count like_track:", error);
    throw error;
  }
}

async function getAllListen(id) {
  try {
    const getAllListening = await db.Listening.count({
      where: {
        track_id: id,
      },
    });
    return { getAllListening };
  } catch (error) {
    console.error("Error count listening", error);
    throw error;
  }
}

async function postListen({ track_id, user_id }) {
  try {
    const postListen = await db.Listening.create({
      track_id,
      user_id,
    });
    return { postListen };
  } catch (error) {
    console.error("Error create Listening", error);
    throw error;
  }
}

async function createAlbums({ album_name, image, user_id }) {
  try {
    const createAlbums = await db.Albums.create({
      album_name,
      image,
      user_id,
    });
    return { createAlbums };
  } catch (error) {
    console.error("Error create Albums:", error);
    throw error;
  }
}

async function createPlaylist({ playlist_name, image, user_id }) {
  try {
    const createPlaylist = await db.Playlist.create({
      playlist_name,
      image,
      user_id,
    });
    return { createPlaylist };
  } catch (error) {
    console.error("Error create Playlist:", error);
    throw error;
  }
}

async function addPlaylist({ playlist_id, track_id }) {
  try {
    const addPlaylist = await db.Playlist_track.findOrCreate({
      where: {
        playlist_id,
        track_id,
      },
    });
    return { addPlaylist };
  } catch (error) {
    console.error("Error findOrCreate Playlist_track", error);
    throw error;
  }
}

async function getPlaylist(id) {
  try {
    const getPlaylist = await db.Playlist.findAll({
      where: {
        user_id: id,
      },
    });
    return { getPlaylist };
  } catch (error) {
    console.error("Error findAll Playlist", error);
    throw error;
  }
}

async function getTrackPlaylist(id) {
  try {
    const getTrackPlaylist = await db.Playlist_track.findAll({
      where: {
        playlist_id: id,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Playlist,
          as: "playlistData",
        },
        {
          model: db.Track,
          as: "trackData",
          include: [
            {
              model: db.User,
              as: "userData",
            },
          ],
        },
      ],
    });
    return { getTrackPlaylist };
  } catch (error) {
    console.error("Error findAll Playlist_track", error);
    throw error;
  }
}

async function getGenre() {
  try {
    const getGenre = await db.Genre.findAll();
    return { getGenre };
  } catch (error) {
    console.error("Error findAll Genre", error);
    throw error;
  }
}

async function getTrackGenre(id) {
  try {
    const getTrackGenre = await db.Track.findAll({
      where: {
        genre_id: id,
      },
    });
    return { getTrackGenre };
  } catch (error) {
    console.error("Error findAll Genre_track:", error);
    throw error;
  }
}

async function searchEveryThing(query) {
  
  const tracksPromise = db.Track.findAll({
    where: {
      track_name: {
        [Op.like]: `%${query}%`,
      },
    },
  });

  const usersPromise = db.User.findAll({
    where: {
      username: {
        [Op.like]: `%${query}%`,
      },
    },
  });

  const [users, tracks] = await Promise.all([usersPromise, tracksPromise]);

  return {users, tracks};
}

module.exports = {
  upload,
  getTrackUser,
  getTrackCount,
  getAllTrack,
  getOneTrack,
  likeTrack,
  unLikeTrack,
  getAllLikeTrack,
  getAllListen,
  postListen,
  createAlbums,
  createPlaylist,
  addPlaylist,
  getPlaylist,
  getTrackPlaylist,
  getGenre,
  getTrackGenre,
  searchEveryThing,
};
