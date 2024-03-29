import { starboardActions } from "../eventActions/starboardActions";

export = async (client, reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction && reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }

  starboardActions.removeStar(client, user, reaction);
};
