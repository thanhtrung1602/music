'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of the Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Info.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    socialnetwork: DataTypes.STRING,
    bio: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Info',
  });
  return Info;
};