import Discord, { EmbedAuthorData, EmbedFooterData } from "discord.js";
import { config } from "../config";
import { prisma } from "../utils/database";

export class starboardActions {
  static async addStar(client, user, reaction) {
    if (
      reaction._emoji &&
      reaction._emoji.name === config.emotes.star &&
      reaction.message.channel.id != config.channels.starchannel
    ) {
      var stars = reaction.count;
      var username = reaction.message.author.username;
      var message = reaction.message.content;
      var avatar = reaction.message.author.displayAvatarURL();
      var link = `https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`;

      var att = reaction.message.attachments;

      let result = await prisma.stars.findUnique({
        where: { messageid: parseInt(reaction.message.id) },
      });

      if (result === null) {
        if (reaction.count == 1) {
          if (user.id === reaction.message.author.id)
            return await reaction.message.channel.send(
              ":x: You cannot star your own message until someone else stars it."
            );

          const author: EmbedAuthorData = {
            name: username,
            iconURL: avatar,
          };

          const footer: EmbedFooterData = {
            text: "⭐ Times starred: " + stars,
          };

          let starBoardMessage = new Discord.MessageEmbed()
            .setAuthor(author)
            .setDescription(
              message + "\n\n**[Click to jump to message.](" + link + ")**"
            )
            .setFooter(footer);
          starBoardMessage.color = config.colors.embedColor;

          console.log(att);

          if (att && typeof att.array !== "undefined" && att.array()[0]) {
            att = att.array()[0].url;
            starBoardMessage.setImage(att);
          }

          let channel = await client.channels.cache.get(
            config.channels.starchannel
          );

          channel.send({ embeds: [starBoardMessage] }).then((sentmessage) => {
            let starObject = {
              messageid: reaction.message.id,
              embedid: sentmessage.id,
              messageChannelid: reaction.message.channel.id,
            };

            prisma.stars.create({ data: starObject }).then(() => {
              return;
            });
          });
        }
      } else {
        client.channels.cache
          .get(config.channels.starchannel)
          .messages.fetch(result.embedid)
          .then((starmessage) => {
            var starmessageEmbed = starmessage.embeds[0];
            var times = starmessageEmbed.footer.text.substring(
              16,
              starmessageEmbed.footer.text.length
            );
            times = reaction.count;
            starmessageEmbed.setFooter("⭐ Times starred: " + times.toString());
            return starmessage.edit(starmessageEmbed);
          });
      }
    }
  }

  static async removeStar(client, user, reaction) {
    if (reaction._emoji && reaction._emoji.name === config.emotes.star) {
      let result = await prisma.stars.findUnique({
        where: { messageid: parseInt(reaction.message.id) },
      });

      if (result !== null) {
        client.channels.cache
          .get(config.channels.starchannel)
          .messages.fetch(result.embedid)
          .then((starmessage) => {
            if (reaction.count > 0) {
              var starmessageEmbed = starmessage.embeds[0];
              var times = starmessageEmbed.footer.text.substring(
                16,
                starmessageEmbed.footer.text.length
              );
              times = reaction.count;
              starmessageEmbed.setFooter(
                "⭐ Times starred: " + times.toString()
              );
              return starmessage.edit(starmessageEmbed);
            } else {
              prisma.stars
                .delete({ where: { messageid: reaction.message.id } })
                .then(() => {
                  return starmessage.delete();
                });
            }
          });
      }
    }
  }

  static async removeMessage(client, message) {
    let result = await prisma.stars.findUnique({
      where: { messageid: parseInt(message.id) },
    });

    if (result !== null) {
      client.channels.cache
        .get(config.channels.starchannel)
        .messages.fetch(result.embedid)
        .then((starmessage) => {
          prisma.stars
            .delete({ where: { messageid: message.id } })
            .then((_) => {
              return starmessage.delete();
            });
        });
    }

    result = await prisma.stars.findUnique({ where: { embedid: parseInt(message.id) } });

    if (result !== null) {
      prisma.stars.delete({ where: { embedid: message.id } }).then(
        client.channels.cache
          .get(result.messageChannelid)
          .messages.fetch(result.messageid)
          .then((starmessage) => {
            starmessage.reactions.removeAll();
          })
      );
    }
  }
}
