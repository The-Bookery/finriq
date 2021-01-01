const messageUpdateActions = require('../eventActions/messageUpdateActions');

module.exports = async (client, oldMessage, newMessage) => {
	try {
    // When we receive a message we check if the reaction is partial or not
		if (oldMessage.partial || newMessage.partial) {
			// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
      oldMessage = await oldMessage.fetch();
      newMessage = await newMessage.fetch();
		}
	} catch (error) {
		console.error('Something went wrong when fetching the message: ', error);
		// Return as `reaction.message.author` may be undefined/null
		return;
  }
  
  messageUpdateActions.sendMessageToModeration(client, oldMessage, newMessage);
};
