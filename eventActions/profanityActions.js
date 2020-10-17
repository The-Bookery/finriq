const config = require('../config.json');
const Discord = require('discord.js');
const profanityTable = require('../databaseFiles/profanityTable.js');
class profanityActions {
	static async checkForProfanity(client, message) {
		if(message.member.roles.cache.some(r => r.id === config.roles.admin) || message.member.roles.cache.some(r => r.id === config.roles.officer)) return;
		await profanityTable.sync();

		const bannedWords = await profanityTable.findAll();

		var cleanmessage = message.content;

		var replacedwords = 0;

		await bannedWords.forEach(bannedWord => {
			if (message.content.toLowerCase().indexOf(bannedWord.word) != -1) {
				var underscores = "";
				var i = 0;
				while (i < bannedWord.word.length) {
					underscores = underscores + "_";
					i += 1;
				}
				cleanmessage = cleanmessage.replace(new Regex(bannedWord.word, "g"), underscores);
				replacedwords += 1;
			}
		});

		if (replacedwords > 0) {
			message.delete();
			const embedMessage = new Discord.MessageEmbed()
				.setColor('#750384')
				.setTitle(message.member.nickname
					? message.member.nickname
					: message.author.username)
				.setDescription(cleanmessage);
			return message.channel.send(embedMessage);
		} else return;
	}
}

module.exports = profanityActions;