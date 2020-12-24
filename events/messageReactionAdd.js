const bookmarkActions = require('../eventActions/bookmarkActions');
const starboardActions = require('../eventActions/starboardActions');

module.exports = async (client, reaction, user) => {
  if (messageReaction.message.partial) await messageReaction.message.fetch();
  console.log("first check");
  // Bookmark messages in DMs
  bookmarkActions.bookmarkMessage(client, user, reaction);
  // Check if message should be added to starboard or if starboard message should be updated
  starboardActions.checkStar(client, user, reaction);
};
