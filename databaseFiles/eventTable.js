const Sequelize = require('sequelize');
const connect = require('./connect.js');

const sequelize = connect.sequelize;

module.exports = sequelize.define('Events', {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  start: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  end: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
