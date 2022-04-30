// Get the afk Table stored in the SQLite database
import { prisma } from "../utils/database.js";
import { config } from "../config";
import { ObjectId } from "mongodb";

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

  const id: number = args[0];

  let result = await prisma.clubs.delete({ where: { id: id } });

  if (result) return message.channel.send("✅ Success!");
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
