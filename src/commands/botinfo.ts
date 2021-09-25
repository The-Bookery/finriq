import Discord from "discord.js";
import { config } from '../config';

const version = config.version;
const versioninfo = config.versioninfo;

export const execute = async (client, message) => {
  let infoMessage = new Discord.MessageEmbed()
    .setTitle("Finriq")
    .setThumbnail(
      "https://images-ext-1.discordapp.net/external/2soj2X2BPQkQsH-kOk_5GmgL9_KUvGcNdd2fcN1s7jo/%3Fsize%3D256/https/cdn.discordapp.com/avatars/693840044032786444/b2598077df8a48b63c9da434ba33aab2.png"
    )
    .addField(
      "Description",
      "A helpful guy from Habitica here to assist in everything you might need!"
    )
    .addField("Version", version)
    .addField("Version Info", versioninfo)
    .addField(
      "GitHub",
      "Want to help us develop Finriq? Check out the repo on GitHub! https://github.com/The-Bookery/finriq"
    );
  infoMessage.color = config.colors.embedColor;
  return await message.channel.send({embeds: [infoMessage]});
};

export const architecture = {
  name: "botinfo",
  aliases: ["bot", "info", "version"],
  module: "Utility",
  description: "Learn more about Finriq.",
  usage: ["botinfo"],
};
