const Sequelize = require('sequelize');
const connect = require('./connect.js');

const sequelize = connect.sequelize;

module.exports = sequelize.define('Profanities', {
  word: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
