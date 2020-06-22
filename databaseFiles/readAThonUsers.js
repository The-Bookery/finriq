const Sequelize = require('sequelize');
const connect = require('./connect.js');

const sequelize = connect.sequelize;

module.exports = sequelize.define('RATParticipants', {
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  goal: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  started: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
