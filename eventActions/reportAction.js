// Get the afk Table stored in the SQLite database
const config = require('../config.json');
const Discord = require('discord.js');

class backspeakCheckAction {
  static async checkReport(client, user, reaction) {
    var message = reaction.message;
    if (reaction._emoji && reaction._emoji.id === config.emotes.report) {
      var channel = client.channels.cache.get(message.channel.id);
      let starBoardMessage = new Discord.MessageEmbed()
        .setColor(config.colors.embedColor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
        .setDescription(message.content)
        .setFooter(`Reported in #${channel.name}`)
        .setTimestamp(message.createdAt);
      client.channels.cache.get(config.channels.reportchannel).send(starBoardMessage)
      .then(() => {
        message.reactions.removeAll();
        user.send(
          ':white_check_mark: Reported to staff.'
        );
      })
      .catch((err) => {
        message.reactions.removeAll();
        user.send(
          ':x: Error when reporting to staff. Please take a screenshot and DM a staff member.'
        );
        let errorMessage = new Discord.MessageEmbed()
          .setColor(config.colors.embedColor)
          .setTitle(`Fatal Error`)
          .setDescription(`Fatal error has been found when trying to report a message. Error: \`${err}\`.`)
          .setFooter(`Action in #${channel.name}`)
          .setTimestamp(message.createdAt);
        message.guild.cache.channels.get(config.channels.logs).send(errorMessage);
      });
    }
  }
}

module.exports = backspeakCheckAction;
