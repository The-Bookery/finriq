const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, oldRole, newRole) => {
  const oldperms = oldRole.permissions.toArray().join("\n");
  const newperms = newRole.permissions.toArray().join("\n");

  const oldname = oldRole.name;
  const newname = newRole.name;

  const oldcolor = oldRole.color;
  const newcolor = newRole.color;

  const oldhoisted = oldRole.hoist;
  const newhoisted = newRole.hoist;

  const oldmention = oldRole.mentionable;
  const newmention = newRole.mentionable;

  if (oldname === newname && oldperms === newperms && oldcolor === newcolor && oldhoisted === newhoisted && oldmention === newmention) return;

  const embed = new Discord.MessageEmbed()
    .setTitle(`Role Updated`)
    .setDescription(`The role \`${oldname}\` has been updated.`)
    .setColor('#ffb980');

  if (oldname !== newname) embed.addField('Name', `\`${oldname}\` -> \`${newname}\``);
  if (oldcolor !== newcolor) embed.addField('Color', `\`#${oldcolor}\` -> \`#${newcolor}\``);
  if (oldperms !== newperms) embed.addField('Permissions', `\`\`\`${newperms}\`\`\``);
  if (oldhoisted !== newhoisted) embed.addField('Hoisted', `\`${oldhoisted == true ? 'Yes' : 'No'}\` -> \`${newhoisted == true ? 'Yes' : 'No'}\``);
  if (oldmention !== newmention) embed.addField('Mentionable', `\`${oldmention == true ? 'Yes' : 'No'}\` -> \`${newmention == true ? 'Yes' : 'No'}\``);

  client.channels.cache.get(config.channels.logs).send(embed);
};