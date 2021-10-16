import { config } from '../config';
import Discord from "discord.js";

export class deleteMessageActions {
  static async sendMessageToModeration(client, message) {
    const isFinriqBot = message.author.id === client.user.id;

    const isCommand = message.content.startsWith(config.prefix);

    if (!(isFinriqBot || isCommand)) {
      let embed = new Discord.MessageEmbed()
        .setTitle("Message Deleted")
        .setAuthor(
          `${message.author.username}#${message.author.discriminator}`,
          message.author.displayAvatarURL()
        )
        .addField("Channel", message.channel.name, true);
      embed.color = config.colors.embedColor;

      if (message.content.length > 0) {
        embed.addField("Message", message.content);
      }

      if (message.attachments.size > 0) {
        embed.addField(
          "Files attached to message:",
          message.attachments.values().next().value.filename
        );
      }
      console.log(client.channels.cache.get(config.channels.logs));
      client.channels.cache.get(config.channels.logs).send({embeds: [embed]});
    }
  }
}
