const Discord = require('discord.js');
const config = require('../config.json');

var prefix = config.prefix;

function capitalizeFLetter(input) {
  return input[0].toUpperCase() + input.slice(1);
}

module.exports.execute = async (client, message, args) => {
  let commands = client.commands;
  var modules = config.modules;
  var cleanmodules = modules.map((v) => v.toLowerCase());
  let commandNames = [];

  if (!args || args.length === 0) {
    var modulelist = '';

    let helpMessage = new Discord.RichEmbed()
      .setColor('#750384')
      .setTitle('List of available modules')
      .setDescription(
        `Modules available in ${message.guild.name}. Use \`.help [module]\` for more about a specific module, or \`.help all\` for all commands.`
      );
    modules.forEach((module) => {
      modulelist = modulelist.concat(`${module}\n`);
    });
    try {
      helpMessage.addField(`All Modules`, `${modulelist}`);
      return await message.channel.send(helpMessage);
    } catch (err) {
      console.log(err);
    }
  } else if (args.length === 1) {
    let command = commands.find(
      (requestedcommand) =>
        requestedcommand.config.name === args[0].toLowerCase() ||
        requestedcommand.config.aliases.find(
          (alias) => alias === args[0].toLowerCase()
        )
    );

    if (command) {
      let helpMessage = new Discord.RichEmbed()
        .setColor('#750384')
        .setTitle(`${prefix}${command.config.name}`)
        .setDescription(
          `You asked for information on \`${prefix}${command.config.name}\``
        );
      helpMessage.addField('Description:', command.config.description);
      helpMessage.addField('Aliases:', command.config.aliases);
      helpMessage.addField('Usage:', command.config.usage);

      try {
        message.channel.send(helpMessage);
      } catch (err) {
        console.log(err);
      }
    } else {
      if (cleanmodules.includes(args[0].toLowerCase())) {
        var modCmd = args[0].toLowerCase(); // User input

        let helpMessage = new Discord.RichEmbed()
          .setColor('#750384')
          .setTitle(`${capitalizeFLetter(modCmd)}`)
          .setDescription(`You asked for commands under the ${modCmd} module`);

        commands.forEach((requestedcommand) => {
          if (
            requestedcommand.config.module.toLowerCase() ==
            args[0].toLowerCase()
          ) {
            helpMessage.addField(
              `**${prefix}${requestedcommand.config.name}**`,
              `${requestedcommand.config.description}`
            );
          }
        });
        try {
          message.channel.send(helpMessage);
        } catch (err) {
          console.log(err);
        }
      } else if (args[0].toLowerCase() == 'all') {
        modCmd = args[0].toLowerCase();

        let helpMessage = new Discord.RichEmbed()
          .setColor('#750384')
          .setTitle(`${capitalizeFLetter(modCmd)}`)
          .setDescription(`You asked for all commands`);

        commands.forEach((requestedcommand) => {
          helpMessage.addField(
            `**${prefix}${requestedcommand.config.name}**`,
            `${requestedcommand.config.description}`
          );
        });
        try {
          message.channel.send(helpMessage);
        } catch (err) {
          console.log(err);
        }
      } else {
        commands.forEach((requestedcommand) => {
          commandNames.push(requestedcommand.config.name);
          requestedcommand.config.aliases.forEach((alias) =>
            commandNames.push(alias)
          );
        });
        return didYouMean(commandNames, args[0].toLowerCase(), message);
      }
    }
  }
};

async function didYouMean(commands, search, message) {
  if (!commands.includes(search)) {
    let score = [];
    let lev = 1000;
    let str = [];
    for (let command of commands) {
      if (levenshtein(search, command) <= lev) {
        lev = levenshtein(search, command);
        str.push(command);
      }
    }
    if (str.length > 1) {
      let arr = [];
      for (let string of str) {
        arr.push(string.split(''));
      }
      for (let i = 0; i < arr.length; i++) {
        score[i] = 0;
        for (let j = 0; j < arr[i].length; j++) {
          if (search.split('')[j] === arr[i][j]) {
            score[i]++;
          }
        }
      }
      return await message.channel
        .send(
          `Did you mean \`${prefix}help ${
            str[score.indexOf(Math.max(...score))]
          }\`?`
        )
        .catch((err) => console.log(err));
    } else {
      return await message.channel
        .send(`Did you mean \`${prefix}help ${str[0]}\`?`)
        .catch((err) => console.log(err));
    }
  }
}

function levenshtein(searchTerm, commandName) {
  if (searchTerm.length === 0) return commandName.length;
  if (commandName.length === 0) return searchTerm.length;
  let tmp, i, j, previous, val, row;
  if (searchTerm.length > commandName.length) {
    tmp = searchTerm;
    searchTerm = commandName;
    commandName = tmp;
  }

  row = Array(searchTerm.length + 1);
  for (i = 0; i <= searchTerm.length; i++) {
    row[i] = i;
  }

  for (i = 1; i <= commandName.length; i++) {
    previous = i;
    for (j = 1; j <= searchTerm.length; j++) {
      if (commandName[i - 1] === searchTerm[j - 1]) {
        val = row[j - 1];
      } else {
        val = Math.min(row[j - 1] + 1, Math.min(previous + 1, row[j] + 1));
      }
      row[j - 1] = previous;
      previous = val;
    }
    row[searchTerm.length] = previous;
  }
  return row[searchTerm.length];
}

module.exports.config = {
  name: 'help',
  aliases: ['help'],
  module: 'Utility',
  description:
    'I will send you this message, or the usage of a specific command.',
  usage: ['help', 'help command'],
};
