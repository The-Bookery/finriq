const bookmarkActions = require('../eventActions/bookmarkActions');

module.exports = async (client, reaction, user) => {
  // Bookmark messages in DMs
  bookmarkActions.bookmarkMessage(client, user, reaction);
};
