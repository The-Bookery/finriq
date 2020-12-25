const Discord = require('discord.js');
const config = require('../config.json');
const Starboard = require('../databaseFiles/starTable.js');

class starboardActions {
  static async addStar(client, user, reaction) {
		if (reaction._emoji && reaction._emoji.name === config.emotes.star && reaction.message.channel.id != config.channels.starboard) {
      var stars = reaction.count;
      var username = reaction.message.author.username;
      var message = reaction.message.content;
      var avatar = reaction.message.author.displayAvatarURL();
      var link = `https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`;

      var att = (reaction.message.attachments);

      
      Starboard.sync().then(() =>
        Starboard.findAll({
          where: {
            messageID: reaction.message.id,
          },
        }).then((result) => {
          if (result.length == 0) {
            if (reaction.count == 1) {
              let starBoardMessage = new Discord.MessageEmbed()
              .setColor('#ffb980')
              .setAuthor(username, avatar)
              .setDescription(message + "\n\n**[Click to jump to message.](" + link + ")**")
              .setFooter('⭐ Times starred: ' + stars);
      
              if (att.array()[0]) {
                att = att.array()[0].url;
                starBoardMessage.setImage(att);
              }

              client.channels.cache.get(config.channels.starboard).send(starBoardMessage).then((sentmessage) => {
                Starboard.create({
                  messageID: reaction.message.id,
                  embedID: sentmessage.id,
                  messageChannelID: reaction.message.channel.id,
                })
                  .then(() => {
                    return;
                  });
              });
            }
          } else {
            client.channels.cache.get(config.channels.starboard).messages.fetch(result[0].embedID).then((starmessage) => {
              var starmessageEmbed = starmessage.embeds[0];
              var times = starmessageEmbed.footer.text.substring(16, starmessageEmbed.footer.text.length);
              times = parseInt(times) + 1;
              starmessageEmbed.setFooter('⭐ Times starred: ' + times.toString());
              return starmessage.edit(starmessageEmbed);
            });
          }
        })
      );
    }
  }

  static async removeStar(client, user, reaction) {
		if (reaction._emoji && reaction._emoji.name === config.emotes.star) {
      Starboard.sync().then(() =>
        Starboard.findAll({
          where: {
            messageID: reaction.message.id,
          },
        }).then((result) => {
          if (result.length == 1) {
            client.channels.cache.get(config.channels.starboard).messages.fetch(result[0].embedID).then((starmessage) => {
              if (reaction.count > 0) {
                  var starmessageEmbed = starmessage.embeds[0];
                  var times = starmessageEmbed.footer.text.substring(16, starmessageEmbed.footer.text.length);
                  times = parseInt(times) - 1;
                  starmessageEmbed.setFooter('⭐ Times starred: ' + times.toString());
                  return starmessage.edit(starmessageEmbed);
              } else {
                Starboard.destroy({
                  where: {
                    messageID: reaction.message.id,
                  },
                }).then(_ => {return starmessage.delete();});
              }
            });
          }
        })
      );
    }
  }
  
  static async removeMessage(client, message) {
    Starboard.sync().then(() => {
      Starboard.findAll({
        where: {
          messageID: message.id,
        },
      }).then((result) => {
        if (result.length == 1) {
          client.channels.cache.get(config.channels.starboard).messages.fetch(result[0].embedID).then((starmessage) => {
            Starboard.destroy({
              where: {
                messageID: message.id,
              },
            }).then(_ => {return starmessage.delete();});
          });
        }
      });

      Starboard.findAll({
        where: {
          embedID: message.id,
        },
      }).then((result) => {
        if (result.length == 1) {
          Starboard.destroy({
            where: {
              embedID: message.id,
            },
          }).then(
            client.channels.cache.get(result[0].messageChannelID).messages.fetch(result[0].messageID).then((starmessage) => {
              starmessage.reactions.removeAll();
            })
          );
        }
      });
    });
  }
}

module.exports = starboardActions;