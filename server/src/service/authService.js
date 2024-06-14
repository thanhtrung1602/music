const connect = require("../config/connect");
const bcrypt = require("bcryptjs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

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
      },
    });
    return { user };
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
}

function generateAccessToken(data) {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
}

function generateRefreshToken(data) {
  const refreshToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "365d",
  });
  return refreshToken;
}

async function loginUser({ email, password }) {
  try {
    //Authentication

    const user = await db.User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      console.error("User not found");
      throw new Error("User not found");
    }
    console.log(password);
    const isCorrectPass = user && bcrypt.compareSync(password, user.password);
    //Authorization

    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    });

    const refresh_token = generateRefreshToken({
      id: user.id,
      username: user.username,
    });

    console.log(accessToken);
    return { user, accessToken, refresh_token };
  } catch (error) {
    console.error("User not found.", error);
    throw error;
  }
}

async function refreshTokenService(token) {
  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({ message: "Invalid token", err });
      }
      if (user) {
        const newAccessToken = generateAccessToken({
          id: user.id,
          username: user.username,
        });
        return { accessToken: newAccessToken };
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("User not found.", error);
    throw error;
  }
}

module.exports = {
  createNewService,
  loginUser,
  refreshTokenService,
};
