// Get the afk Table stored in the SQLite database
const Afks = require('../databaseFiles/afkTable.js');
const Discord = require('discord.js');
const config = require('../config.json');

// call function with variables timestamp1 and timestamp2 in call
function timedifference(timestamp1, timestamp2) {
  // redefine the variables
  timestamp1 = new Date(parseInt(timestamp1));
  timestamp2 = new Date(parseInt(timestamp2));

  let difference = timestamp2.getTime() - timestamp1.getTime();

  difference = Math.floor(difference / 1000 / 60);

  return difference;
}

class afkMessageCheckAction {
  static async checkIfUserIsAFK(client, message) {
    // If the message is a command, we ignore it, to prevent the bot from sending the message right away, when a user goes AFK
    if (message.content.startsWith(config.prefix)) {
      return;
    }

    if (
      message.content.toLowerCase().indexOf('good') != -1 &&
      message.content.toLowerCase().indexOf('morning') != -1
    ) {
      const sender = message.author;
      Afks.destroy({
        where: {
          user: sender.id,
        },
      }).then((result) => {
        // User successfully removed from table
        if (result == 1) {
          message.channel.send(
            `Welcome back, ${
              message.member.nickname
                ? message.member.nickname
                : message.author.username
            }!`
          );
          return;
        }
      });
    }

		const noLongerAFKMessage = new Discord.MessageEmbed()
			.setTitle(`You are currently AFK, ${message.member.nickname ? message.member.nickname : message.author.username}`)
			.addField('Are you back?', 'Run the `.afk` command again in the server.')
			.setFooter('This message will delete itself after 15 seconds.')
			.setColor('#ffb980');
		const user = message.author;

		await Afks.sync().then(() => {
			Afks.findAll({
				where: {
					user: user.id
				}
			}).then(result => {
				if (result.length == 1 && timedifference(result[0].cooldown, Date.now()) >= 3) {
					message.author.send(noLongerAFKMessage)
          .catch((err) => {
            if (err.name == "DiscordAPIError" && timedifference(result[0].cooldown, Date.now()) >= 3) {
              return message.channel.send('Looks like you\'ve disabled private messages! You\'re currently marked as AFK. If you want to turn off AFK, just use `.afk` again!').then(msg => msg.delete({ timeout: 5000 }).catch());
            }

            console.log("Message error: " + err);
          });

          // Reset cooldown
          Afks.update(
            { cooldown: Date.now() },
            { where: { user: user.id } }
          ).catch((error) => {
            'Update error: ' + error;
          });
        }
      });
    });
  }

  static async checkForMention(message) {
    function timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval == 1) {
        return interval + ' year';
      } else if (interval >= 1) {
        return interval + ' years';
      }
      interval = Math.floor(seconds / 2592000);
      if (interval == 1) {
        return interval + ' month';
      } else if (interval >= 1) {
        return interval + ' months';
      }
      interval = Math.floor(seconds / 86400);
      if (interval == 1) {
        return interval + ' day';
      } else if (interval >= 1) {
        return interval + ' days';
      }
      interval = Math.floor(seconds / 3600);
      if (interval == 1) {
        return interval + ' hour';
      } else if (interval >= 1) {
        return interval + ' hours';
      }
      interval = Math.floor(seconds / 60);
      if (interval == 1) {
        return interval + ' minute';
      } else if (interval >= 1) {
        return interval + ' minutes';
      }
      return Math.floor(seconds) + ' seconds';
    }

    // Make sure the message is meant for the one person only. This also means the bot will not trigger on tag spams.
    if (message.mentions.members.size == 1) {
      let id = message.mentions.members.firstKey();
      Afks.sync().then(() => {
        Afks.findAll({
          where: {
            user: id,
          },
        }).then((result) => {
          if (result.length == 1 && message.author.id != id) {
            message.guild.members.fetch(result[0].user).then((user) => {
              let name = user.nickname ? user.nickname : user.user.username;
              const embed = new Discord.MessageEmbed()
                .setTitle(`${name} is not here`)
                .addField('AFK Message:', result[0].message)
                .addField('Went AFK:', timeSince(result[0].date) + ' ago')
                .setColor('#ffb980');
              message.channel.send(embed);
            });
          }
        });
      });
    }
  }
}

module.exports = afkMessageCheckAction;