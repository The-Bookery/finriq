import { config } from '../config';
import Discord from "discord.js";

export = async (client, role) => {
  const embed = new Discord.MessageEmbed();
  embed.title = `Role Deleted`;
  embed.description = `The role \`${role.name}\` has been deleted.`;
  embed.color = config.colors.embedColor;
  client.channels.cache.get(config.channels.logs).send(embed);
};
