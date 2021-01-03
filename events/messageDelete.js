const starboardActions = require('../eventActions/starboardActions');
const messageDeleteActions = require('../eventActions/messageDeleteActions');

module.exports = async (client, message, channel) => {
  messageDeleteActions.sendMessageToModeration(client, message);
  starboardActions.removeMessage(client, message);
};
