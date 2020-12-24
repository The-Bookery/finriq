const starboardActions = require('../eventActions/starboardActions');

module.exports = async (client, message, channel) => {
  starboardActions.removeMessage(client, message);
};
