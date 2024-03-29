// Get the afk Table stored in the SQLite database
import { prisma } from "../utils/database.js";

export const execute = async (client, message, args) => {
  if (!message.guild.me.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"]))
    return message.channel.send(
      "❌ I do not have the permissions to perform this command."
    );

  if (!args || args == "")
    return message.channel.send(
      "You must include the name of the club you wish to join."
    );

  args = args.join(" ").split(" ").join("").toLowerCase();

  let result = await prisma.clubs.findUnique({ where: { prettyName: args } });

  if (result !== null) {
    var role = result.roleid;

    let checkrole;
    if (!role)
      checkrole = message.guild.roles.cache.find((x) => x.name === role);
    else checkrole = message.guild.roles.cache.find((x) => x.id === role);

    if (checkrole == undefined)
      return message.channel.send(
        "Role cannot be found. Contact an admin to fix this."
      );

    try {
      var member = message.guild.members.cache.find(
        (m) => m.user.id === message.author.id
      );
      if (member.roles.cache.find((r) => r.id === role))
        return message.channel.send("You are already in that club.");
      member.roles.add(role);
      return message.channel.send("✅ Success!");
    } catch (err) {
      return message.channel.send(
        `❌ An error occured. Most likely my role is below the role I am trying to give you. Contact an admin to fix this. \`\`\`${err}\`\`\``
      );
    }
  }
};

export const architecture = {
  name: "joinclub",
  aliases: ["join"],
  module: "Clubs",
  description: "Join a book club! See a list by running `.clubs`.",
  usage: ["joinclub <name>"],
};
