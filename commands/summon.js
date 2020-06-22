const Discord = require('discord.js');
const logschannel = require('../config.json').channels.logs;

module.exports.execute = async (client, message, args) => {
  try {
    let logMessage = new Discord.RichEmbed()
      .setColor('#750384')
      .setTitle(`\`.summon\` command deleted`);
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
      `_:candle: ${message.author} summons <@${args[0]}>. :candle:_`
    );
  } else {
    var name = args.join(' ');
    if (name == '') {
      return await message.channel.send(
        `_:candle: ${message.author} summons a genie. :candle:_`
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
        `_:candle: ${message.author} summons ${name}. :candle:_`
      );
    } else {
      return await message.channel.send(
        `_:candle: ${message.author} summons the entire server. :candle:_`
      );
    }
  }
};

module.exports.config = {
  name: 'summon',
  aliases: ['call'],
  module: 'Fun',
  description: 'Summons specified user.',
  usage: ['summon [user]'],
};
