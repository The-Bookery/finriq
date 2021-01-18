const config = require('../config.json');
const Discord = require('discord.js');

class updateMessageActions {
	static async sendMessageToModeration(client, oldMessage, newMessage) {
    if (oldMessage.channel.id != config.channels.logs) {
      if (oldMessage.embeds.length == 0 && newMessage.embeds.length > 0) return; // Client likely had to fetch an embed from a link
      try {
        const embed = new Discord.MessageEmbed()
          .setAuthor(`${newMessage.author.username}#${newMessage.author.discriminator}`, newMessage.author.displayAvatarURL())
          .setTitle(`Message Edited`)
          .setDescription(`Message edited in <#${newMessage.channel.id}>.`)
          .addField(
            'Previous Content',
            oldMessage.content
          )
          .addField(
            'Current Content',
            newMessage.content
          )
          .setColor(config.colors.embedColor);
        client.channels.cache.get(config.channels.logs).send(embed);
      } catch {
        // This will trigger if the message was empty (should be impossible) or if it was an embed, which is possible.
      }
    }

		const isFinriqBot = newMessage.author.id === client.user.id;

		const isCommand = newMessage.content.startsWith(config.prefix);

		const isStaffAccountability = newMessage.channel.id == config.channels.staffaccountability;
	
		if(!(isFinriqBot || isCommand || isStaffAccountability)){
			
			let embed = new Discord.MessageEmbed()
				.setTitle('Message Updated')
        .setColor(config.colors.embedColor)
        .setAuthor(`${newMessage.author.username}#${newMessage.author.discriminator}`, newMessage.author.displayAvatarURL())
        .addField('Channel', newMessage.channel, true)
        .setFooter(`Updated in #${channel.name}`)
        .setTimestamp(message.createdAt);
        
      let first = true;
      
      if(oldMessage.content.length > 0){
        for (let i = 0; i < oldMessage.cleanContent.length; i += 1000) {
          const cont = oldMessage.cleanContent.substring(i, Math.min(oldMessage.cleanContent.length, i + 1000));
          embed.addField(first == true ? "Old Message Content" : "Old Message Content (Cont.)", cont);
          first = false;
        }
      }
      
      first = true;

      if(newMessage.content.length > 0) {
        for (let i = 0; i < oldMessage.cleanContent.length; i += 1000) {
          const cont = oldMessage.cleanContent.substring(i, Math.min(oldMessage.cleanContent.length, i + 1000));
          embed.addField(first == true ? "New Message Content" : "New Message Content (Cont.)", cont);
          first = false;
        }
      }

      client.channels.cache.get(config.channels.logs).send(embed);
		}
	}
}

module.exports = updateMessageActions;