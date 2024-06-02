'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listening extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Listening.belongsTo(models.Track, {foreignKey: 'track_id', targetKey: 'id', as: 'trackData'});
      Listening.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id', as: 'userData'});
    }
  }
  Listening.init({
    track_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Listening',
    tableName: 'listening',
  });
  return Listening;
};