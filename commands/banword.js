const profanityTable = require('../databaseFiles/profanityTable.js');
const config = require('../config.json');

module.exports.execute = async (client, message, args) => {
	if(message.member.roles.cache.some(r => r.id === config.roles.admin)) {
		if(!args[0]) {
			return message.channel.send('Please enter a word to ban!');
    }
    
		await profanityTable.create({
      word: args[0],
    });

		return message.channel.send(`Success! Added ${args[0]} to the blocked word list!`);
	}
	else {
		message.reply('Only moderators can run this command!');
	}
};

module.exports.config = {
	name: 'banword',
	aliases: ['blockword'],
	description: 'Bans a specific word.',
	usage: ['banword word']
};