'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Album_track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of the Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Album_track.init({
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    track_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album_track',
  });
  return Album_track;
};