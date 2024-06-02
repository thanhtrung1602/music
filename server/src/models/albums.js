'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of the Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Albums.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id', as: 'userData'})
    }
  }
  Albums.init({
    album_name: DataTypes.STRING,
    image: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Albums',
    tableName: 'albums'
  });
  return Albums;
};