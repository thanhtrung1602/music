"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Playlist_track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist_track.belongsTo(models.Playlist, {
        foreignKey: "playlist_id",
        targetKey: "id",
        as: "playlistData",
      });
      Playlist_track.belongsTo(models.Track, {
        foreignKey: "track_id",
        targetKey: "id",
        as: "trackData",
      });
    }
  }
  Playlist_track.init(
    {
      description: DataTypes.STRING,
      playlist_id: DataTypes.INTEGER,
      track_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Playlist_track",
      tableName: "playlist_track",
    }
  );
  return Playlist_track;
};
