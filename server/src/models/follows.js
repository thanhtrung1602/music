'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follows.belongsTo(models.User, {foreignKey: 'followerId', targetKey: 'id', as: 'Follower'})
      Follows.belongsTo(models.User, {foreignKey: 'followingId', targetKey:"id", as: 'Following'});
    }
  }
  Follows.init({
      followerId: DataTypes.INTEGER,
      followingId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Follows',
    tableName: 'follows',
  });
  return Follows;
};