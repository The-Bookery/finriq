const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, oldMessage, newMessage) => {
  oldMessage = oldMessage ? oldMessage : '(No value.)';
  newMessage = newMessage ? newMessage : '(No value.)';
  console.log(oldMessage);
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
    .setColor('#ffb980');
  client.channels.cache.get(config.channels.logs).send(embed);
};
