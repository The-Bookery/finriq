const config = require('../config.json');

module.exports = (client) => {
	client.api.applications(client.user.id).guilds(791366170611679272).commands.post({
		data: {
				name: "hello",
				description: "hello world command"
				// possible options here e.g. options: [{...}]
		}
	});

	console.log(`Running on ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`);
	client.user.setActivity(config.playing);
};
