const Discord = require('discord.js');
const logschannel = require('../config.json').channels.logs;

module.exports.execute = async (client, message, args) => {
  client.api.applications(client.user.id).guilds('791366170611679272').commands.post({
		data: {
				name: "hello",
				description: "hello world command"
				// possible options here e.g. options: [{...}]
		}
  });
};

module.exports.config = {
name: 'addslashes',
aliases: [],
module: 'Utility',
description: 'Adds test commands to slash menu.',
usage: ['addslashes'],
};
