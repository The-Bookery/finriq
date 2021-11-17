import { config } from "../config";
import { catchUp, scanForReminders } from "../utils/remind";

export = async (client) => {
  await catchUp(client);
  setInterval(scanForReminders, 30000, client);

  client.user.setActivity(config.playing);

  console.log(
    `Running on ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`
  );
};
