const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, member) => {
  if(member.user.bot) return;

  const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
    .setTitle(`Member Left`)
    .setDescription(`${message.author.username}#${message.author.discriminator} left the server.`)
    .setColor('#ffb980');
  client.channels.cache.get(config.channels.logs).send(embed);
};