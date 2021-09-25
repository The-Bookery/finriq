import { starboardActions } from "../eventActions/starboardActions";
import { deleteMessageActions } from "../eventActions/messageDeleteActions";

export = async (client, message, channel) => {
  deleteMessageActions.sendMessageToModeration(client, message);
  starboardActions.removeMessage(client, message);
};
