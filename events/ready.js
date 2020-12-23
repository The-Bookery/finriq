const config = require('../config.json');

module.exports = (client) => {
	console.log(`Running on ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`);
	client.user.setActivity(config.playing);
};
