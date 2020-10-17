const profanityTable = require('../databaseFiles/profanityTable.js');
module.exports.execute = async (client, message, args) => {
	if(message.member.roles.cache.some(r => {r.id === config.roles.admin || r.id === config.roles.officer;})) {
		if(!args[0]) {
			return message.channel.send('Please enter a word to unban!');
    }

		profanityTable.destroy({
      where: {
        word: args[0]
      }
    }).then(deleted => {
      if (!deleted) {
        return message.channel.send('That word was not banned.');
      }
    });

		return message.channel.send(`Success! Unbanned ${args[0]} from the list!`);	
	}
	else {
		message.reply('Only moderators can run this command!');
	}
};

module.exports.config = {
	name: 'unbanword',
	aliases: ['unblockword'],
	description: 'Unbans a specific word.',
	usage: ['unbanword word']
};