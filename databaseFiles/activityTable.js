const Sequelize = require('sequelize');
const connect = require('./connect.js');

const sequelize = connect.sequelize;

module.exports = sequelize.define('Afk', {
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
