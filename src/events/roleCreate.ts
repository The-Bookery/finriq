import { config } from '../config';
import Discord from "discord.js";

export = async (client, role) => {
  const perms = role.permissions.toArray().join("\n");

  const embed = new Discord.MessageEmbed();
  embed.title = `Role Created`;
  embed.description = `The role \`${role.name}\` has been created.`;
  embed.fields = [{name: "Permissions", value: perms, inline: false}];
  embed.color = config.colors.embedColor;
  client.channels.cache.get(config.channels.logs).send({embeds: [embed]});
};
