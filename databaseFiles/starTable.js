const Sequelize = require('sequelize');
const connect = require('./connect.js');

const sequelize = connect.sequelize;

module.exports = sequelize.define('Stars', {
  messageID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  embedID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  messageChannelID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
