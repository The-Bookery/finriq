import { config } from "../config";

export = async (client) => {
  client.user.setActivity(config.playing);

  console.log(
    `Running on ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`
  );
};
