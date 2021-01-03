const config = require('../config.json');
const Discord = require('discord.js');
const profanityTable = require('../profanity.json');

class profanityActions {
	static async checkForProfanity(client, message) {
		if(message.member.roles.cache.some(r => r.id === config.roles.admin)) return;// || message.member.roles.cache.some(r => r.id === config.roles.officer)) return;

		const bannedWords = await profanityTable.banned;

		var cleanmessage = message.content;
		var logchannel = client.channels.cache.get(config.channels.logs);
		var replacedwords = 0;

		await bannedWords.forEach(bannedWord => {
			if (message.content.toLowerCase().indexOf(bannedWord) != -1) {
				var asterisks = "";
				var i = 0;
				while (i < bannedWord.length) {
					asterisks = asterisks + "\\*";
					i += 1;
				}
				var re = new RegExp(bannedWord,"gi");
        cleanmessage = cleanmessage.replace(re, asterisks);
        console.log(cleanmessage.replace(re, asterisks));
				replacedwords += 1;
			}
    });

		if (replacedwords > 0) {
      message.delete();
      var check = cleanmessage;
      if(check.split("*").join("").split('\\').join('').trim().length == 0) { // Only contains curse words
        const embedMessage = new Discord.MessageEmbed()
          .setColor('#ffb980')
          .setTitle(message.member.nickname
            ? message.member.nickname
            : message.author.username)
          .setDescription('Watch your language.');
        await message.channel.send(embedMessage).then(msg => {
          msg.delete({timeout: 5000})
        });
      } else {
        const embedMessage = new Discord.MessageEmbed()
          .setColor('#750384')
          .setTitle(message.member.nickname
            ? message.member.nickname
            : message.author.username)
          .setDescription(cleanmessage);
        await message.channel.send(embedMessage);
      }

			const logMessage = new Discord.MessageEmbed()
				.setColor('#750384')
				.setTitle("Profanity Replaced")
				.setDescription(`Profanity detected and replaced in ${message.channel}.`)
				.addField('User', message.author, true)
				.addField('Link', `[Go to message](${message.url})`, true)
				.addField('Message', `**${message.content}**`, true)
				.setFooter(
					message.author.username + '#' + message.author.discriminator,
					message.author.avatarURL
				);
			return await logchannel.send(logMessage);
		} else return;
	}
}

module.exports = profanityActions;