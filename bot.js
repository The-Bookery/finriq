// Load dependencies
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const connect = require('./databaseFiles/connect.js');

const client = new Discord.Client({
  disableMentions: 'everyone',
  ws: {
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS']
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  const jsfile = files.filter((f) => f.split('.').pop() === 'js');
  if (jsfile.length <= 0) {
    return console.log('No errors have been loaded!');
  }
  jsfile.forEach((file) => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  const jsfile = files
    .filter((t) => !t.includes('.test.'))
    .filter((f) => f.split('.').pop() === 'js');
  if (jsfile.length <= 0) {
    return console.log('No commands have been loaded!');
  }
  jsfile.forEach((f) => {
    const pull = require(`./commands/${f}`);
    client.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach((alias) => {
      client.aliases.set(alias, pull.config.name);
    });
  });
});

client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

// Connect to given database
connect.instantiateConnection();

client.login(config.botToken);
