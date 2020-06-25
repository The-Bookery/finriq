const Sequelize = require('sequelize');
const connect = require('./connect.js');

const sequelize = connect.sequelize;

module.exports = sequelize.define('Afk', {
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  streak: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0
  },
  daily: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0
  },
});
