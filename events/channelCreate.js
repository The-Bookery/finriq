const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, channel) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(`Channel Created`)
    .setDescription(`The channel \`#${channel.name}\` has been created.`)
    .setColor('#ffb980');
  client.channels.cache.get(config.channels.logs).send(embed);
};