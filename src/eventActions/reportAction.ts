// Get the afk Table stored in the MongoDB database
import { config } from '../config';
import Discord from "discord.js";

export class reportActions {
  static async checkReport(client, user, reaction) {
    var message = reaction.message;

    try {
      if (reaction._emoji && reaction._emoji.id === config.emotes.report) {
        await reaction.users.remove(user.id);
        var channel = client.channels.cache.get(message.channel.id);
        let starBoardMessage = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.username}#${message.author.discriminator}`,
            message.author.displayAvatarURL()
          )
          .setDescription(message.content)
          .setFooter(`Reported in #${channel.name}`)
          .setTimestamp(message.createdAt);
        starBoardMessage.color = config.colors.embedColor;
        client.channels.cache
          .get(config.channels.reportchannel)
          .send({embeds: [starBoardMessage]})
          .then(() => {
            user.send(":white_check_mark: Reported to staff.");
          });
      }
    } catch(err) {
      user.send(
        ":x: Error when reporting to staff. Please take a screenshot of the message and DM a staff member."
      );
      let errorMessage = new Discord.MessageEmbed()
        .setTitle(`Fatal Error`)
        .setDescription(
          `Fatal error has been found when trying to report a message. Error: \`${err}\`.`
        )
        .setFooter(`Action in #${channel.name}`)
        .setTimestamp(message.createdAt);
      errorMessage.color = config.colors.embedColor;
      message.guild.channels.cache.get(config.channels.logs).send({embeds: [errorMessage]});
    }
  }
}
