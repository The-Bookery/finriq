const config = require('../config.json');
const Discord = require('discord.js');
const profanityTable = require('../databaseFiles/profanityTable.js');
class profanityActions {
	static async checkForProfanity(client, message) {
		const bannedWords = await profanityTable.findAll();
		if (bannedWords.some((word) => message.content.includes(word))) {
			var cleanmessage = message.content;

			bannedWords.forEach(bannedWord => {
				var underscores = "";
				i = 0;
				while (i < bannedWord.length) {
					underscores = underscores + "_";
				}
				cleanmessage.replace(bannedWord, underscores);
			});

			const embedMessage = new Discord.RichEmbed()
				.setColor('#750384')
				.setTitle(message.member.nickname
					? message.member.nickname
					: message.author.username)
				.setDescription(cleanmessage);
			return client.channels
				.get(config.channels.moderation)
				.send(embedMessage);
		}
	}
}

module.exports = profanityActions;