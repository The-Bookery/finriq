const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, oldRole, newRole) => {
  const oldperms = oldRole.permissions.toArray().join("\n");
  const newperms = newRole.permissions.toArray().join("\n");

  const oldname = oldRole.name;
  const newname = newRole.name;

  const oldcolor = oldRole.color;
  const newcolor = newRole.color;

  const oldhoisted = oldRole.hoisted;
  const newhoisted = newRole.hoisted;

  const oldmention = oldRole.mentionable;
  const newmention = oldRole.mentionable;

  if (oldname === newname && oldperms === newperms && oldcolor === newcolor && oldhoisted === newhoisted && oldmention === newmention) return;

  const embed = new Discord.MessageEmbed()
    .setTitle(`Role Updated`)
    .setDescription(`The role \`${oldname}\` has been updated.`)
    .setColor('#ffb980');

  if (oldname !== newname) embed.addField('New Name', newname);
  if (oldcolor !== newcolor) embed.addField('New Color', newcolor);
  if (oldperms !== newperms) embed.addField('New Permissions', newperms);
  if (oldhoisted !== newhoisted) embed.addField('Hoisted', newhoisted);
  if (oldmention !== newmention) embed.addField('Mentionable', newmention);

  client.channels.cache.get(config.channels.logs).send(embed);
};