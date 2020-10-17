const profanityTable = require('../databaseFiles/profanityTable.js');

module.exports.execute = async (client, message, args) => {
	profanityTable.drop();
};

module.exports.config = {
	name: 'droptable',
	aliases: ['droptablefaoidnsaf'],
	description: 'Bans a specific word.',
	usage: ['banword word']
};