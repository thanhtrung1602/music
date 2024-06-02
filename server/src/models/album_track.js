'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Album_tracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of the Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album_tracks.belongsTo(models.Albums, {foreignKey: 'album_id', targetKey: 'id', as: 'albumData'});
      Album_tracks.belongsTo(models.Track, {foreignKey: 'track_id', targetKey: 'id', as: 'trackData'})
    }
  }
  Album_tracks.init({
    description: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    track_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album_track',
    tableName: 'album_tracks'
  });
  return Album_tracks;
};