const trackService = require('../../service/trackService');
const db = require('../../models/index');
const { where } = require('sequelize');

class TrackController {
    viewTrack(req, res) {
        res.render('track')
    };

    async upload(req, res) {
        const fileSound = req.files['sound']?.[0].path; 
        const fileImage = req.files['image']?.[0].path; 
        const { track_name, description, user_id, category_id, genre_id } = req.body;

        try {
            if(!track_name || !user_id)  {
                return res.status(400).json({ EM: 'missing', EC: '-1', DT: '' });
            }
            const track = await trackService.upload({ track_name, description, user_id, category_id, genre_id }, fileSound, fileImage);
            return res.status(200).json(track);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ EM: 'Server error', EC: '-1', DT: '' });
        }
        
    };

    async getTrackUser(req, res) {
        const id = req.params.id;
        try {
            const track = await db.Track.findAll({
                order: [['createdAt', 'DESC']],
                where: {
                    user_id: id
                }
            })
            return res.json(track);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getTrackCount(req, res) {
        const id = req.params.id;
        try {
            const amountTrack = await db.Track.count({
                where: {
                    user_id: id
                }
            });
            return res.json(amountTrack);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getCommentTrackCount(req, res) {
        const id = req.params.id;
        try {
            const amountCommentTrack = await db.Comment.count({
                where: {
                    track_id: id,
                }
            });
            return res.json(amountCommentTrack);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getAllCommentTrack(req, res) {
        const id = req.params.id;
        try {
            const getAllCommentTrack = await db.Comment.findAll({
                order: [['createdAt', 'DESC']],
                where: {
                    track_id: id
                },
                include: [{
                    model: db.User,
                    as: 'userData'
                }]
            });
            return res.status(200).json(getAllCommentTrack)
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async postCommentTrack(req, res) {
        const { id, date, title, track_id, user_id } = req.body;
        try {
            const postCommentTrack = await db.Comment.create({
                title,
                date, 
                track_id, 
                user_id
            })
            return res.status(200).json(postCommentTrack);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }
    
    async getAllTrack(req, res) {
        try {
            const getAllTrack = await db.Track.findAll({
                order: [['createdAt', 'DESC']],
                include: [{
                    model: db.User,
                    as: 'userData'
                }]
            });
            return res.status(200).json(getAllTrack);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getOneTrack(req, res) {
        const id = req.params.id;
        try {
            const getOneTrack = await db.Track.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: db.User,
                    as: 'userData'
                }]
            });
            return res.status(200).json(getOneTrack)
        } catch (error) {   
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async likeTrack(req, res) {
        const { track_id, user_id } = req.body;
        try {
            const [likeTrack, created] = await db.Like_track.findOrCreate({
                where: {
                    track_id,
                    user_id
                },
                defaults: {
                    track_id,
                    user_id
                }
            });
            return res.status(200).json(likeTrack);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async unLikeTrack(req, res) {
        const trackId = req.params.trackId;
        const userId = req.params.userId;
        try {
            const unLikeTrack = await db.Like_track.destroy({
                where: {
                    track_id: trackId,
                    user_id: userId
                }
            });
            return res.status(200).json(unLikeTrack)
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getAllLikeTrack(req, res) {
        const id = req.params.id;
        try {
            const getAllLikeTrack = await db.Like_track.count({
                where: {
                    track_id: id
                }
            });
            return res.status(200).json(getAllLikeTrack);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getAllListen(req, res) {
        const id = req.params.id;
        try {
            const getAllListening = await db.Listening.count({
                where: {
                    track_id: id
                }
            })
            return res.status(200).json(getAllListening)
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async postListen(req, res) {
        const {track_id, user_id} = req.body
        try {
            const postListen = await db.Listening.create({
                track_id,
                user_id
            });
            return res.status(200).json(postListen)
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async createAlbums(req, res) {
        const { album_name, image, user_id } = req.body;
        try {
            const createAlbums = await db.Albums.create({
                album_name,
                image,
                user_id
            });
            return res.status(200).json(createAlbums);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async createPlaylist(req, res) {
        const { playlist_name, image, user_id } = req.body;
        try {
            const createPlaylist = await db.Playlist.create({
                playlist_name,
                image,
                user_id
            });
            return res.status(200).json(createPlaylist);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    };

    async addPlaylist(req, res) {
        const { playlist_id, track_id } = req.body;
        try {
            const addPlaylist = await db.Playlist_track.findOrCreate({
                where: {
                    playlist_id,
                    track_id
                }
            });
            return res.status(200).json(addPlaylist);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getPlaylist(req, res) {
        const id = req.params.id;
        try {
            const getPlaylist = await db.Playlist.findAll({
                where: {
                    user_id: id
                }
            })
            return res.status(200).json(getPlaylist);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getTrackPlaylist(req, res) {
        const id = req.params.id;
        try {
            const getTrackPlaylist = await db.Playlist_track.findAll({
                where: {
                    playlist_id: id
                },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.Playlist,
                        as: 'playlistData',
                    },
                    {
                    model: db.Track,
                    as: 'trackData',
                        include: [{
                            model: db.User,
                            as: 'userData'
                        }]
                    }
                ]
            })
            return res.status(200).json(getTrackPlaylist)
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }
    
    async getGenre(req, res) {
        try {
            const getGenre = await db.Genre.findAll()
            return res.status(200).json(getGenre)
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getTrackGenre(req, res) {
        const id = req.params.id;
        try {
            const getTrackGenre = await db.Track.findAll({
                where: {
                    genre_id: id
                }
            })
            return res.status(200).json(getTrackGenre);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

}

module.exports = new TrackController();
