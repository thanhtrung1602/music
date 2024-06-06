const authService = require("../../service/authService.js");
const jwt = require('jsonwebtoken');
require('dotenv').config();
class AuthController {
    async register(req, res) {
        const { username, email, password } =  req.body;
        try {
            if( !username || !email || !password ) {
                return res.status(400).json({
                    EM: 'missing',
                    EC: '-1',
                    DT: '' 
                })
            }
            const response = await authService.createNewService(req.body);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                EM: 'error messega',
                EC: '-1',
                DT: '' 
            })
        }
    };

    async login(req, res) {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({
                    EM: 'missing',
                    EC: '-1',
                    DT: '' 
                });
            };
            const  response =  await authService.loginUser(req.body);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                EM: 'error messega',
                EC: '-1',
                DT: '' ,
                error
            })
        }
    };

    getToken(req, res) {

        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided or token is invalid' });
        }
        const token = req.headers.authorization.split(' ')[1]; 

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decodedToken) {
            if (err) {
                return res.status(401).json({ message: 'Invalid token', err });
            }
            res.json({
                id: decodedToken.id,
                username: decodedToken.username
            });
        });
    }

    getLogin(req, res) {
        return res.render('login');
    }

    getRegister(req, res) {
        return res.render('register');
    }
}

module.exports = new AuthController;
