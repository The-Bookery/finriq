const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, role) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(`Role Deleted`)
    .setDescription(`The role \`${role.name}\` has been deleted.`)
    .setColor('#ffb980');
  client.channels.cache.get(config.channels.logs).send(embed);
};