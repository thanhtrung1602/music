'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorites.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id', as: 'userData'})
      Favorites.belongsTo(models.Track, {foreignKey: 'track_id', targetKey: 'id', as: 'trackData'})
    }
  }
  Favorites.init({
    user_id: DataTypes.INTEGER,
    track_id: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'Favorites',
    tableName: 'favorites',
  });
  return Favorites;
};