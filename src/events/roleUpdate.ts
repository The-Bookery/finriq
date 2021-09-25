import { config } from '../config';
import Discord from "discord.js";

export = async (client, oldRole, newRole) => {
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

  if (
    oldname === newname &&
    oldperms === newperms &&
    oldcolor === newcolor &&
    oldhoisted === newhoisted &&
    oldmention === newmention
  )
    return;

  const embed = new Discord.MessageEmbed();
  embed.title = `Role Updated`;
  embed.description = `The role \`${oldname}\` has been updated.`;
  embed.color = config.colors.embedColor;

  if (oldname !== newname)
    embed.fields.push({name: "Name", value:`\`${oldname}\` -> \`${newname}\``,inline: false});
  if (oldcolor !== newcolor)
  embed.fields.push({name: "Color", value: `\`#${oldcolor}\` -> \`#${newcolor}\``, inline: false});
  if (oldperms !== newperms)
  embed.fields.push({name: "Permissions", value: `\`\`\`${newperms}\`\`\``, inline: false});
  if (oldhoisted !== newhoisted)
    embed.fields.push({
      name: "Hoisted",
      value: `\`${oldhoisted == true ? "Yes" : "No"}\` -> \`${
        newhoisted == true ? "Yes" : "No"
      }\``,
      inline: false
    });
  if (oldmention !== newmention)
    embed.fields.push({
      name: "Mentionable",
      value: `\`${oldmention == true ? "Yes" : "No"}\` -> \`${
        newmention == true ? "Yes" : "No"
      }\``,
      inline: false
    });

  client.channels.cache.get(config.channels.logs).send(embed);
};
