const connect = require('../../config/connect');
const trackService = require('../../service/trackService');
const { Sequelize } = require('sequelize');
const db = require('../../models/index');
class TrackController {
    viewTrack(req, res) {
        res.render('track')
    };

    async upload(req, res) {
        const fileSound = req.file?.path; 
        const { track_name, user_id } = req.body;

        try {
            if(!track_name || !user_id)  {
                return res.status(400).json({ EM: 'missing', EC: '-1', DT: '' });
            }
            const track = await trackService.upload({ track_name, user_id }, fileSound);
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

    async getLikeTrackCount(req, res) {
        const id = req.params.id;
        try {
            const amountLikeTrack = await db.Like.count({
                where: {
                    track_id: id,
                }
            });
            return res.json(amountLikeTrack);
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
}

module.exports = new TrackController();
