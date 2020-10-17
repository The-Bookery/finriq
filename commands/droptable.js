const profanityTable = require('../databaseFiles/profanityTable.js');

module.exports.execute = async (client, message, args) => {
  profanityTable.drop();
  return message.channel.send("Dropped");
};

module.exports.config = {
	name: 'droptable',
	aliases: ['droptablefaoidnsaf'],
	description: 'Bans a specific word.',
	usage: ['banword word']
};