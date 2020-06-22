const Discord = require('discord.js');
const logschannel = require('../config.json').channels.logs;

module.exports.execute = async (client, message, args) => {
  try {
    let logMessage = new Discord.RichEmbed()
      .setColor('#750384')
      .setTitle(`\`.jail\` command deleted`);
    logMessage.addField('User:', message.author.tag);
    logMessage.addField('Message:', message.content);
    logMessage.addField('Channel:', message.channel);

    message.delete();

    try {
      message.guild.channels.get(logschannel).send(logMessage);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log('Delete error' + err);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  if (getRandomInt(100) == 99) {
    var name;

    if (parseInt(args[0])) {
      return await message.channel.send(
        `_${args[0]} uses a "get out of jail free" card_`
      );
    } else {
      name = args.join(' ');
      if (name == '') {
        return await message.channel.send(
          `_<@${message.author.id}> uses a "get out of jail free" card_`
        );
      }
      //Replace with mention if possible
      message.channel.members.forEach((member) => {
        if (
          member.displayName.toLowerCase().indexOf(name.toLowerCase()) != -1 ||
          member.user.username.toLowerCase().indexOf(name.toLowerCase()) != -1
        )
          name = '<@' + member.id + '>';
      });
      if (name != '@everyone') {
        return await message.channel.send(
          `_${name} uses a "get out of jail free" card_`
        );
      } else {
        return await message.channel.send(
          '_Jailbreak! Everyone escapes from jail!_'
        );
      }
    }
  } else {
    if (parseInt(args[0])) {
      return await message.channel.send(`_Puts <@${args[0]}> in jail_`);
    } else {
      name = args.join(' ');
      if (name == '') {
        return await message.channel.send(
          `_Puts <@${message.author.id}> in jail._`
        );
      }
      //Replace with mention if possible
      message.channel.members.forEach((member) => {
        if (
          member.displayName.toLowerCase().indexOf(name.toLowerCase()) != -1 ||
          member.user.username.toLowerCase().indexOf(name.toLowerCase()) != -1
        )
          name = '<@' + member.id + '>';
      });
      if (name != '@everyone') {
        return await message.channel.send(`_Puts ${name} in jail._`);
      } else {
        return await message.channel.send("_Everyone's in jail now._");
      }
    }
  }
};

module.exports.config = {
  name: 'jail',
  aliases: ['lockup', 'lock'],
  module: 'Fun',
  description: 'Jails specified user.',
  usage: ['jail [user]'],
};
