const { Model } = require("sequelize");
const db = require("../models/index");

async function getAllUser() {
  try {
    const users = await db.User.findAll();
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user.get({ plain: true });
      return userWithoutPassword;
    });
    return { usersWithoutPassword };
  } catch (error) {
    console.error("Error findAll user", error);
    throw error;
  }
}

async function getUserDetail(id) {
  try {
    const getUserDetail = await db.User.findOne({
      where: {
        id: id,
      },
    });
    return { getUserDetail };
  } catch (error) {
    console.error("Error findOne user", error);
    throw error;
  }
}

async function follows({ followerId, followingId }) {
  try {
    const follow = await db.Follows.findOrCreate({
      where: {
        followerId,
        followingId,
      },
      defaults: {
        followerId,
        followingId,
      },
    });
    return { follow };
  } catch (error) {
    console.error("Error follow", error);
    throw error;
  }
}

async function unFollows({ followerId, followingId }) {
  try {
    const unFollow = await db.Follows.destroy({
      where: {
        followerId,
        followingId,
      },
    });
    return { unFollow };
  } catch (error) {
    console.error("Error follow", error);
    throw error;
  }
}

//Số lượng người đang theo dõi tôi
async function followerUserCount(id) {
  try {
    const follower = await db.Follows.count({
      where: {
        followingId: id,
      },
    });
    return { follower };
  } catch (error) {
    console.error("Error count follower", error);
    throw error;
  }
}
// Số lượng người mà tôi đang theo dõi
async function followingUserCount(id) {
  try {
    const following = await db.Follows.count({
      where: {
        followerId: id,
      },
    });
    return { following };
  } catch (error) {
    console.error("Error count following", error);
    throw error;
  }
}

//lấy người đang theo dõi tôi
async function getFollowerUser(id) {
  try {
    const follower = await db.Follows.findAll({
      where: {
        followingId: id,
      },
      include: [
        {
          model: db.User,
          as: "Follower",
        },
      ],
    });
    return { follower };
  } catch (error) {
    console.error("Error count follower", error);
    throw error;
  }
}
// lấy người mà tôi đang theo dõi
async function getFollowingUser(id) {
  try {
    const following = await db.Follows.findAll({
      where: {
        followerId: id,
      },
      include: [
        {
          model: db.User,
          as: "Following",
        },
      ],
    });
    return { following };
  } catch (error) {
    console.error("Error count following", error);
    throw error;
  }
}

module.exports = {
  getAllUser,
  follows,
  unFollows,
  getUserDetail,
  followerUserCount,
  followingUserCount,
  getFollowerUser,
  getFollowingUser,
};
