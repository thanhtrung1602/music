const userService = require("../../service/userService.js");

class UsersController {
    getAllUser(req, res) {
        const sql  =  'SELECT * FROM user';
        return userService.getAllUser(sql, res);
    }
}

module.exports = new UsersController();