const Discord = require('discord.js');
const logschannel = require('../config.json').channels.logs;

module.exports.execute = async (client, message, args) => {
  try {
    let logMessage = new Discord.RichEmbed()
      .setColor('#750384')
      .setTitle(`\`.hug\` command deleted`);
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

  if (parseInt(args[0])) {
    return await message.channel.send(
      `_Hugs <@${args[0]}>._\nDon't worry, it'll be alright.`
    );
  } else {
    var name = args.join(' ');
    if (name == '') {
      return await message.channel.send(
        `_Hugs <@${message.author.id}>._\nDon't worry, it'll be alright.`
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
        `_Hugs ${name}._\nDon't worry, it'll be alright.`
      );
    } else {
      return await message.channel.send(
        `_Hugs the entire server._\nDon't worry, it'll be alright.`
      );
    }
  }
};

module.exports.config = {
  name: 'hug',
  aliases: ['hug'],
  module: 'Fun',
  description: 'Hugs specified user.',
  usage: ['hug [user]'],
};
