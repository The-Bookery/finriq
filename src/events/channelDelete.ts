import Discord from "discord.js";
import { config } from "../config";

export = async (client, channel) => {
  const embed = new Discord.MessageEmbed();
  embed.title = "Channel Deleted";
  embed.description = `The channel \`#${channel.name}\` has been deletd.`;
  embed.color = config.colors.embedColor;

  client.channels.cache.get(config.channels.logs).send({ embeds: [embed] });
};
