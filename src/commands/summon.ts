import Discord from "discord.js";
import { config } from '../config';
const logschannel = config.channels.logs;

export const execute = async (client, message, args) => {
  try {
    let logMessage = new Discord.MessageEmbed()
      .setTitle(`\`.summon\` command deleted`);
    logMessage.addField("User:", message.author.tag);
    logMessage.addField("Message:", message.content);
    logMessage.addField("Channel:", message.channel);
    logMessage.color = config.colors.embedColor;

    message.delete();

    try {
      message.guild.channels.cache.get(logschannel).send({embeds: [logMessage]});
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log("Delete error" + err);
  }

  if (parseInt(args[0])) {
    return await message.channel.send(
      `_:candle: ${message.author} summons <@${args[0]}>. :candle:_`
    );
  } else {
    var name = args.join(" ");
    if (name == "") {
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
        name = "<@" + member.id + ">";
    });
    if (name != "@everyone") {
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

export const architecture = {
  name: "summon",
  aliases: ["call"],
  module: "Fun",
  description: "Summons specified user.",
  usage: ["summon [user]"],
};
