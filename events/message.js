const config = require('../config.json');
const afkAction = require('../eventActions/afkMessageCheckAction');
const reactions = require('../eventActions/reactions');
const backspeak = require('../eventActions/backspeak');
const accountabilityActions = require('../eventActions/accountabilityActions');
const cafeActions = require('../eventActions/cafeActions');
const oneWordStory = require('../eventActions/oneWordStory');

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
      return message.channel.send('W̷̳̞̌ä̷̙͜ṯ̵̈́ć̴̹̳h̵͖̭̐ ̴̛̳̭o̵͖͊ͅų̵̛̱t̶͙̏́');
      commandfile.execute(client, message, args); // Execute found command
    }
  }

  // Handle greetings
	cafeActions.greetMorningOrNight(client, message);
  reactions.checkIfCorrect(message);
  backspeak.checkForGame(message);
  // Handle accountability reactions
  accountabilityActions.addReaction(client, message);
  afkAction.checkIfUserIsAFK(client, message);
  afkAction.checkForMention(message);
  oneWordStory.oneWordMessage(message);
};