"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Track.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "userData",
      });
      Track.belongsTo(models.Categories, {
        foreignKey: "category_id",
        targetKey: "id",
        as: "categoryData",
      });
      Track.belongsTo(models.Genre, {
        foreignKey: "genre_id",
        targetKey: "id",
        as: "genreData",
      });
    }
  }
  Track.init(
    {
      track_name: DataTypes.STRING,
      sound: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      genre_id: DataTypes.INTEGER,
      listen_count: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Track",
      tableName: "tracks",
    }
  );
  return Track;
};
