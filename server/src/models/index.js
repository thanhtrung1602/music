'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const env = process.env.NODE_ENV || 'development';
const db = {};

async function loadConfig() {
  const configPath = path.join(__dirname, '..', 'config', 'config.json');
  const configJson = require(configPath);
  return configJson[env];
}

async function initDb() {
  const config = await loadConfig();
  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  
  const models = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== path.basename(__filename) &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    })
    .map(file => {
      const filePath = path.join(__dirname, file);
      const model = require(filePath);
      if (typeof model !== 'function') {
        throw new Error(`"model" exported from ${filePath} is not a function. Check the model file for errors.`);
      }
      return model(sequelize, Sequelize.DataTypes);
    });
  
  for (let model of models) {
    db[model.name] = model;
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

(async () => {
  await initDb();
})();

module.exports = db;