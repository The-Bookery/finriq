const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, channel) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(`Channel Deleted`)
    .setDescription(`The channel \`#${channel.name}\` has been deleted.`)
    .setColor(config.colors.embedColor);
  client.channels.cache.get(config.channels.logs).send(embed);
};
