// Get the afk Table stored in the SQLite database
import { Clubs } from "../databaseFiles/connect.js";
import { config } from "../config";
import { ObjectId } from 'mongodb';

export const execute = async (client, message, args) => {
  if (!message.member.roles.cache.some((r) => r.id === config.roles.admin))
    return message.channel.send("❌ This is an admin-only command.");

  if (!args || args == "")
    return message.channel.send(
      "You must include the ID of the club you wish to delete."
    );
  if (!parseInt(args[0]))
    return message.channel.send(
      "You must include the ID of the club you wish to delete. (You can find this by using `.club <club name>`.)"
    );

  const id = new ObjectId(args[0]);

  let result = await Clubs.deleteOne({ _id: id });

  if (result.deletedCount > 0) return message.channel.send("✅ Success!");
  else
    return message.channel.send(
      "❌ Something went wrong. Are you sure that club exists?"
    );
};

export const architecture = {
  name: "deleteclub",
  aliases: ["dclub"],
  module: "Clubs",
  description: "Delete a book club.",
  usage: ["addclub <name> <description>"],
};
