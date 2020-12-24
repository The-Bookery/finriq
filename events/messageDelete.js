const starboardActions = require('../eventActions/starboardActions');
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, message, channel) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
    .setTitle(`Message Deleted`)
    .setDescription(`Message deleted in <#${message.channel.id}>.`)
    .addField(
      'Content',
      `\`\`\`${message.content}\`\`\``
    )
    .setColor('#ffb980');
  client.channels.cache.get(config.channels.logs).send(embed);

  starboardActions.removeMessage(client, message);
};
