// Get the afk Table stored in the SQLite database
import { config } from '../config';
import Discord from 'discord.js';

export class reportCheckAction {
  static async checkReport(client, user, reaction) {
    var message = reaction.message;

    try {
      if (reaction._emoji && reaction._emoji.id === config.emotes.report) {
        await reaction.users.remove(user.id);
        var channel = client.channels.cache.get(message.channel.id);
        let reportMessage = new Discord.MessageEmbed();
        reportMessage.color = config.colors.embedColor;
        reportMessage.author = {
          name: `${message.author.username}#${message.author.discriminator}`,
          url: message.author.displayAvatarURL(),
        };
        reportMessage.description = message.content;
        reportMessage.fields.push({
          name: 'Link',
          value: `[Go to message](${message.url})`,
          inline: true,
        });
        reportMessage.footer = {
          text: `Reported in #${channel.name} by ${user.username}#${user.discriminator}`,
        };
        reportMessage.timestamp = message.createdAt;
        client.channels.cache
          .get(config.channels.reportchannel)
          .send({ content: `<@&${config.roles.admin}>`, embeds: [reportMessage] })
          .then(() => {
            user.send(':white_check_mark: Reported to staff.');
          });
      }
    } catch (err) {
      user.send(
        ':x: Error when reporting to staff. Please take a screenshot of the message and DM a staff member.'
      );
      let errorMessage = new Discord.MessageEmbed();
      errorMessage.color = config.colors.embedColor;
      errorMessage.title = `Fatal Error`;
      errorMessage.description = `Fatal error has been found when trying to report a message. Error: \`${err}\`.`;
      errorMessage.footer = { text: `Action in #${channel.name}` };
      errorMessage.timestamp = message.createdAt;
      message.guild.channels.cache
        .get(config.channels.logs)
        .send({ embeds: [errorMessage] });
    }
  }
}
