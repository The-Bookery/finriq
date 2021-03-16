const Discord = require('discord.js');
const config = require('../config.json');
const Starboard = require('../databaseFiles/connect.js').Stars;

class starboardActions {
  static async addStar(client, user, reaction) {
		if (reaction._emoji && reaction._emoji.name === config.emotes.star && reaction.message.channel.id != config.channels.starchannel) {
      var stars = reaction.count;
      var username = reaction.message.author.username;
      var message = reaction.message.content;
      var avatar = reaction.message.author.displayAvatarURL();
      var link = `https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`;

      var att = (reaction.message.attachments);

      let result = await Starboard.findOne({ messageID: reaction.message.id });

      if (result === null) {
        if (reaction.count == 1) {
          if (user.id === reaction.message.author.id) return await reaction.message.channel.send(':x: You cannot star your own message until someone else stars it.');
          let starBoardMessage = new Discord.MessageEmbed()
          .setColor(config.colors.embedColor)
          .setAuthor(username, avatar)
          .setDescription(message + "\n\n**[Click to jump to message.](" + link + ")**")
          .setFooter('⭐ Times starred: ' + stars);
  
          if (att.array()[0]) {
            att = att.array()[0].url;
            starBoardMessage.setImage(att);
          }

          let channel = await client.channels.cache.get(config.channels.starchannel);
          
          channel.send(starBoardMessage).then((sentmessage) => {
            let starObject = {
              messageID: reaction.message.id,
              embedID: sentmessage.id,
              messageChannelID: reaction.message.channel.id
            }

            Starboard.insertOne(starObject)
              .then(() => {
                return;
              });
          });
        }
      } else {
        client.channels.cache.get(config.channels.starchannel).messages.fetch(result.embedID).then((starmessage) => {
          var starmessageEmbed = starmessage.embeds[0];
          var times = starmessageEmbed.footer.text.substring(16, starmessageEmbed.footer.text.length);
          times = reaction.count;
          starmessageEmbed.setFooter('⭐ Times starred: ' + times.toString());
          return starmessage.edit(starmessageEmbed);
        });
      }
    }
  }

  static async removeStar(client, user, reaction) {
		if (reaction._emoji && reaction._emoji.name === config.emotes.star) {
      let result = await Starboard.findOne({messageID: reaction.message.id});

      if (result !== null) {
        client.channels.cache.get(config.channels.starchannel).messages.fetch(result.embedID).then((starmessage) => {
          if (reaction.count > 0) {
              var starmessageEmbed = starmessage.embeds[0];
              var times = starmessageEmbed.footer.text.substring(16, starmessageEmbed.footer.text.length);
              times = reaction.count;
              starmessageEmbed.setFooter('⭐ Times starred: ' + times.toString());
              return starmessage.edit(starmessageEmbed);
          } else {
            Starboard.deleteOne({ messageID: reaction.message.id }).then(() => {return starmessage.delete();});
          }
        });
      }
    }
  }
  
  static async removeMessage(client, message) {
    let result = await Starboard.findOne({messageID: message.id});

    if (result !== null) {
      client.channels.cache.get(config.channels.starchannel).messages.fetch(result.embedID).then((starmessage) => {
        Starboard.deleteOne({ messageID: message.id }).then(_ => {return starmessage.delete();});
      });
    }

    result = await Starboard.findOne({embedID: message.id});

    if (result !== null) {
      Starboard.deleteOne({ embedID: message.id }).then(
        client.channels.cache.get(result.messageChannelID).messages.fetch(result.messageID).then((starmessage) => {
          starmessage.reactions.removeAll();
        })
      );
    }
  }
}

module.exports = starboardActions;