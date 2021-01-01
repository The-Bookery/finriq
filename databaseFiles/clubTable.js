const Sequelize = require('sequelize');
const connect = require('./connect.js');

const sequelize = connect.sequelize;

module.exports = sequelize.define('Clubs', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  clubName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prettyName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  roleID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
