const userService = require("../../service/authService.js");
const { Sequelize } = require('sequelize');
const db = require('../../models/index');
class UsersController {
    getUser(req, res) { 
        return userService.getAllUser(sql, res);
    }

    getTokenUser(req, res) {
        return res.render('user')
    }

    async getAllUser(req, res) {
        try {
            const users = await db.User.findAll();
            const usersWithoutPassword = users.map(
                user => {
                    const { password, ...userWithoutPassword } = user.get({plain: true});
                    return userWithoutPassword;
                }
            )
            return res.status(200).json(usersWithoutPassword);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getOneUserTrack(req, res) {
        const id = req.params.id;
        try {
            const userId = await db.User.findOne({
                where: {
                    id: id
                }
            });
            return res.status(200).json(userId);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }

    async getUserDetail(req, res) {
        const id = req.params.id;
        try {
            const getUserDetail = await db.User.findOne({
                where: {
                    id: id
                }
            })
            return res.status(200).json(getUserDetail);
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }
}

module.exports = new UsersController();