const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, channel) => {
  if (channel.type === 'dm') return;
  const embed = new Discord.MessageEmbed()
    .setTitle(`Channel Created`)
    .setDescription(`The channel \`#${channel.name}\` has been created.`)
    .setColor(config.colors.embedColor);
  client.channels.cache.get(config.channels.logs).send(embed);
};