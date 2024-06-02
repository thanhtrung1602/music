'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReplyComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of the Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReplyComment.belongsTo(models.Comment, {foreignKey: 'comment_id', targetKey: 'id', as: 'commentData'}),
      ReplyComment.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id', as: 'userData'})
    }
  }
  ReplyComment.init({
    reply: DataTypes.STRING,
    comment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReplyComment',
    tableName: 'replyComment',
  });
  return ReplyComment;
};