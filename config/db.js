const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: process.env.DB_DIALECT || 'mysql'
});

module.exports = sequelize;
