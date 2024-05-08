const userService = require("../../service/userService.js");
const { Sequelize } = require('sequelize');
const db = require('../../models/index');
class UsersController {
    getUser(req, res) { 
        return userService.getAllUser(sql, res);
    }

    getTokenUser(req, res) {
        return res.render('user')
    }

    renderSearch(req, res) {
        return res.render('search')
    }

    async getOneUser(req, res) {
        const key = req.params.key;
        try {
            const getOneUser = await db.User.findOne({
                where: {
                    username: key
                }
            });

            const getOneTrack = await db.Track.findOne({
                where: {
                    track_name: key
                }
            });

            return res.status(200).json({getOneUser, getOneTrack})
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }
}

module.exports = new UsersController();