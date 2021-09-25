import { config } from '../config';
import Discord from "discord.js";

export = async (client, channel) => {
  if (channel.type === "dm") return;
  const embed = new Discord.MessageEmbed();
  embed.title = 'Channel Created';
  embed.description = `The channel \`#${channel.name}\` has been created.`;
  embed.color = config.colors.embedColor;
  
  client.channels.cache.get(config.channels.logs).send(embed);
};
