const connect = require('../config/connect');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

function getAllUser(sql, res) {
    connect.query(sql, (err, result) => {
        return err ? res.json(err) : res.json(result);
    });
}

function hashUserPassword(password) {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

async function createNewService({ username, email, password }) {
    const hashPass = hashUserPassword(password);
    try {
        const user = await db.User.findOrCreate({
            where: { email },
            defaults: {
                username,
                email,
                password: hashPass,
            }
        });
        return { user };
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
}

async function loginUser({ email, password }) {
    try {
        const  user =  await db.User.findOne({
            where: { email },
            raw: true
        });
        const { password, ...other } = user
        const isCorrectPass = user && bcrypt.compareSync(password, user.password);
        return { ...other};
    } catch (error) {
        console.error('User not found.', error);
        throw error;
    }
}   

module.exports = {
    createNewService,
    loginUser,
    getAllUser,
};