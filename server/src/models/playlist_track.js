'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playlist_track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Playlist_track.init({
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    playlist_id: DataTypes.INTEGER,
    track_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist_track',
  });
  return Playlist_track;
};