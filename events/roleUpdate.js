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
  const oldperms = oldRole.permissions;
  const newperms = newRole.permissions;

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
  if (oldperms !== newperms) {
    const permUpdated = [];

    for (const [key, element] of Object.entries(oldperms)) {
      if (newperms[key] !== element) permUpdated.push(element);
    }

    if (oldperms > newperms) {
      //Permission lost
      console.log('R: ' + permUpdated.join('').toArray().join(', '));
      //embed.addField('Permissions Removed', `\`\`\`${permUpdated.join("\n")}\`\`\``);
    } else if (oldperms < newperms) {
      //Permission given
      console.log('G: ' + permUpdated.join(', '));
      //embed.addField('Permissions Given', `\`\`\`${permUpdated.join("\n")}\`\`\``);
    }
  }
  if (oldhoisted !== newhoisted) embed.addField('Hoisted', `\`${oldhoisted == true ? 'Yes' : 'No'}\` -> \`${newhoisted == true ? 'Yes' : 'No'}\``);
  if (oldmention !== newmention) embed.addField('Mentionable', `\`${oldmention == true ? 'Yes' : 'No'}\` -> \`${newmention == true ? 'Yes' : 'No'}\``);

  client.channels.cache.get(config.channels.logs).send(embed);
};