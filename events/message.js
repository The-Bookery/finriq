const config = require('../config.json');
const afkAction = require('../eventActions/afkMessageCheckAction');
const reactions = require('../eventActions/reactions');
const backspeak = require('../eventActions/backspeak');
const cafeActions = require('../eventActions/cafeActions');
const profanityActions = require('../eventActions/profanityActions');

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const args = message.content.split(/\s+/g); // Return the message content and split the prefix.
  const command =
    message.content.startsWith(config.prefix) &&
    args.shift().slice(config.prefix.length);

  if (command) {
    const commandfile =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));

    if (commandfile) {
      message.channel.startTyping();
      commandfile.execute(client, message, args); // Execute found command
      message.channel.stopTyping();
    }
  }
  
	profanityActions.checkForProfanity(client, message);
  // Handle greetings
  cafeActions.greetMorningOrNight(client, message);
  cafeActions.holidayReacts(client, message);
  reactions.checkIfCorrect(message);
  backspeak.checkForGame(message);
  afkAction.checkIfUserIsAFK(client, message);
  afkAction.checkForMention(message);
};