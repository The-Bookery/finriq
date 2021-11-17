import { Prefixes } from "../databaseFiles/connect";
import { afkMessageCheckAction } from "../eventActions/afkMessageCheckAction";
import { reactionCheckAction } from "../eventActions/reactions";
import { backspeakCheckAction } from "../eventActions/backspeak";
import { cafeActions } from "../eventActions/cafeActions";
import { profanityActions } from "../eventActions/profanityActions";

export = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const args = message.content.split(/\s+/g); // Return the message content and split the prefix.

  var prefix;

  try {
    prefix = await Prefixes.findOne({ guild: message.guild.id });
    prefix = prefix.prefix; // Get the 'prefix' string from the JSON object if found. If not will return error for trying to get null
  } catch {
    prefix = ".";
  }

  if (
    args[0] === `<@!${client.user.id}>` ||
    message.content.startsWith(`<@!${client.user.id}>`)
  ) {
    prefix = `<@!${client.user.id}>`;
    if (args[0] === prefix) {
      args.shift();
      args[0] = prefix + args[0]; // Dirty fix
    }
  }

  const command =
    message.content.startsWith(prefix) && args.shift().slice(prefix.length);

  if (command) {
    const commandfile =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));

    if (commandfile) {
      message.channel.sendTyping();
      commandfile.execute(client, message, args); // Execute found command
    }
  }

  profanityActions.checkForProfanity(client, message);
  // Handle greetings
  cafeActions.greetMorningOrNight(client, message);
  cafeActions.holidayReacts(client, message);
  reactionCheckAction.checkIfCorrect(message);
  backspeakCheckAction.checkForGame(message);
  afkMessageCheckAction.checkIfUserIsAFK(client, message);
  afkMessageCheckAction.checkForMention(message);
};
