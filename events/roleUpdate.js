const config = require('../config.json');
const Discord = require('discord.js');

function getDifference(a, b) {
  var i = 0;
  var j = 0;
  var result = "";

  while (j < b.length) {
    if (a[i] != b[j] || i == a.length)
      result += b[j];
    else
      i++;
    j++;
  }
  return result;
}

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

  if (oldname !== newname) embed.addField('Name', `\`\`\`${oldname}\`\`\` -> \`\`\`${newname}\`\`\``);
  if (oldcolor !== newcolor) embed.addField('Color', `\`\`\`#${oldcolor}\`\`\` -> \`\`\`#${newcolor}\`\`\``);
  if (oldperms !== newperms) embed.addField('Permissions', `\`\`\`${getDifference(oldperms, newperms)}\`\`\``);
  if (oldhoisted !== newhoisted) embed.addField('Hoisted', `\`\`\`${oldhoisted == true ? 'Yes' : 'No'}\`\`\` -> \`\`\`${newhoisted == true ? 'Yes' : 'No'}\`\`\``);
  if (oldmention !== newmention) embed.addField('Mentionable', `\`\`\`${oldmention == true ? 'Yes' : 'No'}\`\`\` -> \`\`\`${newmention == true ? 'Yes' : 'No'}\`\`\`);

  client.channels.cache.get(config.channels.logs).send(embed);
};