const config = require('../config.json');
const accountabilityCron = require('../eventActions/accountabilityCron');

module.exports = (client) => {
	var cronJob = require('cron').CronJob;
	try {
		new cronJob("00 00 00 * * *", function() {
			accountabilityCron.check(client);
		}, undefined, true, "UTC");
		console.log(`Cron job has been set up!`);
	} catch(err) {
		console.error("Cron job error: " + err);
	}

	console.log(`Running on ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`);
	client.user.setActivity(config.playing);
};
