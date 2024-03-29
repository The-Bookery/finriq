import { config } from "../config";
import Discord, { EmbedAuthorData } from "discord.js";

export class updateMessageActions {
  static async sendMessageToModeration(client, oldMessage, newMessage) {
    if (oldMessage.channel.id != config.channels.logs) {
      if (oldMessage.embeds.length == 0 && newMessage.embeds.length > 0) return; // Client likely had to fetch an embed from a link
      try {
        const author: EmbedAuthorData = {
          name: `${newMessage.author.username}#${newMessage.author.discriminator}`,
          iconURL: newMessage.author.displayAvatarURL(),
        };

        const embed = new Discord.MessageEmbed()
          .setAuthor(author)
          .setTitle(`Message Edited`)
          .setDescription(`Message edited in <#${newMessage.channel.id}>.`)
          .addField("Previous Content", oldMessage.content)
          .addField("Current Content", newMessage.content);
        embed.color = config.colors.embedColor;
        client.channels.cache
          .get(config.channels.logs)
          .send({ embeds: [embed] });
      } catch {
        // This will trigger if the message was empty (should be impossible) or if it was an embed, which is possible.
      }
    }

    const isFinriqBot = newMessage.author.id === client.user.id;

    const isCommand = newMessage.content.startsWith(config.prefix);

    if (!(isFinriqBot || isCommand)) {
      const author: EmbedAuthorData = {
        name: `${newMessage.author.username}#${newMessage.author.discriminator}`,
        iconURL: newMessage.author.displayAvatarURL(),
      };

      let embed = new Discord.MessageEmbed()
        .setTitle("Message Updated")
        .setAuthor(author)
        .addField("Channel", newMessage.channel.name, true)
        .setFooter(`Updated in #${newMessage.channel.name}`)
        .setTimestamp(oldMessage.createdAt);
      embed.color = config.colors.embedColor;

      let first = true;

      if (oldMessage.content.length > 0) {
        for (let i = 0; i < oldMessage.cleanContent.length; i += 1000) {
          const cont = oldMessage.cleanContent.substring(
            i,
            Math.min(oldMessage.cleanContent.length, i + 1000)
          );
          embed.addField(
            first == true
              ? "Old Message Content"
              : "Old Message Content (Cont.)",
            cont
          );
          first = false;
        }
      }

      first = true;

      if (newMessage.content.length > 0) {
        for (let i = 0; i < oldMessage.cleanContent.length; i += 1000) {
          const cont = oldMessage.cleanContent.substring(
            i,
            Math.min(oldMessage.cleanContent.length, i + 1000)
          );
          embed.addField(
            first == true
              ? "New Message Content"
              : "New Message Content (Cont.)",
            cont
          );
          first = false;
        }
      }

      client.channels.cache.get(config.channels.logs).send({ embeds: [embed] });
    }
  }
}
