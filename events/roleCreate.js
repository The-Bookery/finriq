const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, role) => {
  const perms = role.permissions.toArray().join("\n");

  const embed = new Discord.MessageEmbed()
    .setTitle(`Role Created`)
    .setDescription(`The role \`${role.name}\` has been created.`)
    .addField('Permissions', perms)
    .setColor(config.colors.embedColor);
  client.channels.cache.get(config.channels.logs).send(embed);
};