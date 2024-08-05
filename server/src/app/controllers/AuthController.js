const authService = require("../../service/authService.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
class AuthController {
  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      if (!username || !email || !password) {
        return res.status(400).json({
          EM: "missing",
          EC: "-1",
          DT: "",
        });
      }
      const response = await authService.createNewService(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        EM: "error messega",
        EC: "-1",
        DT: "",
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({
          EM: "missing",
          EC: "-1",
          DT: "",
        });
      }
      const response = await authService.loginUser(req.body);
      console.log(response);
      const { accessToken, user, refresh_token } = response;
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // set to false if not using HTTPS
        sameSite: "Strict", // or 'Lax', depending on your requirements
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        EM: "error messega",
        EC: "-1",
        DT: "",
        error,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.headers.authorization.split(" ")[1];
      if (refreshToken) {
        const response = await refreshTokenService(refreshToken);
        return res.status(200).json(response);
      }
    } catch (error) {
      console.error("User not found.", error);
      throw error;
    }
  }

  getLogin(req, res) {
    return res.render("login");
  }

  getRegister(req, res) {
    return res.render("register");
  }
}

module.exports = new AuthController();
