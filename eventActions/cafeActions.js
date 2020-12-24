const config = require('../config.json');
const afkAction = require('./afkMessageCheckAction');

class cafeActions {
	static async greetMorningOrNight(client, message) {
		// Handle good morning and goodnight, and hello and goodbye
		if (
			message.content.toLowerCase().indexOf("good") != -1 &&
			message.content.toLowerCase().indexOf("night") != -1 &&
			message.content.toLowerCase().indexOf("bookery") != -1
		) {
			client.commands
				.get("afk")
				.execute(client, message, ["Went to sleep.", "auto"]);
			return await message.react(config.emotes.goodnight);
		} else if (
			message.content.toLowerCase().indexOf("goodbye") != -1 &&
			message.content.toLowerCase().indexOf("bookery") != -1
		) {
			client.commands
				.get("afk")
				.execute(client, message, ["They didn't tell us where they went...", "auto"]);
			return await message.react(config.emotes.wave);
		} else if (
			message.content.toLowerCase().indexOf("good") != -1 &&
			message.content.toLowerCase().indexOf("morning") != -1 &&
			message.content.toLowerCase().indexOf("bookery") != -1
		) {
			afkAction.checkIfUserIsAFK(client, message);
			return await message.react(config.emotes.goodmorning);
		} else if (
			message.content.toLowerCase().indexOf("hello") != -1 &&
			message.content.toLowerCase().indexOf("bookery") != -1
		) {
			afkAction.checkIfUserIsAFK(client, message);
			return await message.react(config.emotes.wave);
		}
	}
	static async holidayReacts(client, message) {
		// Handle merry Christmas
		if (
			message.content.toLowerCase().indexOf("merry") != -1 &&
			message.content.toLowerCase().indexOf("christmas") != -1
		) {
			reactions = ['🎄', '☃️', '❄️'];
			choice = reactions[Math.floor(Math.random() * (reactions.length - 1))];
			return await message.react(choice);
		}
	}
}

module.exports = cafeActions;