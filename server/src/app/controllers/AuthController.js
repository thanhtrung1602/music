const userService = require("../../service/userService.js");
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
            const response = await userService.createNewService(req.body);
            if(response) {
                return res.send('email is register!')
            }
            return res.redirect('login_')
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
            const  response =  await userService.loginUser(req.body);
            console.log(response)
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                EM: 'error messega',
                EC: '-1',
                DT: '' 
            })
        }
    };

    getLogin(req, res) {
        return res.render('login');
    }

    getRegister(req, res) {
        return res.render('register');
    }
}

module.exports = new AuthController;
