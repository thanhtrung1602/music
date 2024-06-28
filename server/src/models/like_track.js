"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like_track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like_track.belongsTo(models.Track, {
        foreignKey: "track_id",
        targetKey: "id",
        as: "trackData",
      });
      Like_track.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "userData",
      });
    }
  }
  Like_track.init(
    {
      track_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like_track",
      tableName: "like_track",
    }
  );
  return Like_track;
};
