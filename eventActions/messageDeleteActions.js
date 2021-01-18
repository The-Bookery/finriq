const config = require('../config.json');
const Discord = require('discord.js');

class deleteMessageActions {
	static async sendMessageToModeration(client, message) {
		const isFinriqBot = message.author.id === client.user.id;

		const isCommand = message.content.startsWith(config.prefix);

		const isStaffAccountability = message.channel.id == config.channels.staffaccountability;
	
		if(!(isFinriqBot || isCommand || isStaffAccountability)){
			
			let embed = new Discord.MessageEmbed()
				.setTitle('Message Deleted')
        .setColor(config.colors.embedColor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
				.addField('Channel', message.channel, true);
			
			if(message.content.length > 0){
				embed.addField('Message', message.content);
			}

			if(message.attachments.size > 0){
				embed.addField('Files attached to message:', message.attachments.values().next().value.filename);
			}
			
			client.channels.cache.get(config.channels.logs).send(embed);
		}
	}
}

module.exports = deleteMessageActions;