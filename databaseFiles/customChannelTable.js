const Sequelize = require('sequelize');
const connect = require('./connect.js');

const sequelize = connect.sequelize;

module.exports = sequelize.define('CustomChannels', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  roleid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
