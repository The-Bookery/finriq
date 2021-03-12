// Database requirements - Connection created at end
const { MongoClient } = require('mongodb');
const config = require('../config.json');

// Create connection
const client = new MongoClient(
  config.mongodbURI,
  { useUnifiedTopology: true }
);

client.connect();

// Make sure MongoDB can be accessed outside of this file
module.exports.Afks = client.db(config.mongodbDatabase).collection('Afks');
module.exports.Clubs = client.db(config.mongodbDatabase).collection('Clubs');
module.exports.Games = client.db(config.mongodbDatabase).collection('Games');
module.exports.Stars = client.db(config.mongodbDatabase).collection('Stars');