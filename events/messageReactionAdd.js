const bookmarkActions = require('../eventActions/bookmarkActions');
const starboardActions = require('../eventActions/starboardActions');
const reportActions = require('../eventActions/reportAction');

module.exports = async (client, reaction, user) => {
	try {
		// When we receive a reaction we check if the reaction is partial or not
		if (reaction.partial) {
			// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
			reaction = await reaction.fetch();
		}
	} catch (error) {
		console.error('Something went wrong when fetching the message: ', error);
		// Return as `reaction.message.author` may be undefined/null
		return;
	}
  
  // Bookmark messages in DMs
  bookmarkActions.bookmarkMessage(user, reaction);
  // Check if message should be added to starboard or if starboard message should be updated
	starboardActions.addStar(client, user, reaction);
	// Check if user is reporting a message
	reportActions.checkReport(client, user, reaction);
};
