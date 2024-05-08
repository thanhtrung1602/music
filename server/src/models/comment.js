'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of the Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Track, {foreignKey: 'track_id', targetKey: 'id', as: 'TrackData'}),
      Comment.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id', as: 'UserData'})
    }
  }
  Comment.init({
    title: DataTypes.STRING,
    track_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comment',
  });
  return Comment;
};