const userService = require("../../service/userService.js");

class UsersController {
    getUser(req, res) { 
        return userService.getAllUser(sql, res);
    }

    getTokenUser(req, res) {
        return res.render('user')
    }
}

module.exports = new UsersController();