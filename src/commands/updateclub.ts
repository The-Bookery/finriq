// Get the afk Table stored in the SQLite database
import { prisma } from "../utils/database.js";
import { config } from "../config";
import { ObjectId } from "mongodb";

export const execute = async (client, message, args) => {
  if (!message.member.roles.cache.some((r) => r.id === config.roles.admin))
    return message.channel.send("❌ This is an admin-only command.");

  if (!args || args == "")
    return message.channel.send(
      "You must include the ID of the club you wish to edit, the field you wish to edit, and the new value, all seperated by semicolons."
    );

  let cleanargs = new Array(3);

  args = args.join(" ").split(";");

  if (args.length < 3) {
    if (!args[0] || args[0] == "" || !parseInt(args[0]))
      return message.channel.send("You must include a valid club ID!");
    if (!args[1] || args[1] == "")
      return message.channel.send(
        "You must include the field you wish to change! Options: `name`, `description`, `role`."
      );
    if (!args[2] || args[2] == "")
      return message.channel.send(
        "You must include the value you wish to change to!"
      );
    return;
  }

  let i = 0;

  args.forEach((arg) => {
    cleanargs[i] = arg.trim();
    i++;
  });

  const id: number = cleanargs[0];
  var field = cleanargs[1].toLowerCase();
  var value = cleanargs[2];

  if (value == "") return message.channel.send("Value cannot be empty!");

  if (value == "role") {
    value = value
      .split("<")
      .join("")
      .split(">")
      .join("")
      .split("@")
      .join("")
      .split("&")
      .join("");

    let checkrole;
    if (!parseInt(value))
      checkrole = message.guild.roles.cache.find((x) => x.name === value);
    else checkrole = message.guild.roles.cache.find((x) => x.id === value);

    if (checkrole == undefined)
      return message.channel.send("Role cannot be found.");
  }

  try {
    if (field == "name") {
      var cleanname = cleanargs[0].split(" ").join("");
      await prisma.clubs.update({
        where: { id: id },
        data: { clubName: value, prettyName: cleanname },
      });
    } else if (field == "description") {
      await prisma.clubs.update({
        where: { id: id },
        data: { description: value },
      });
    } else if (field == "role") {
      await prisma.clubs.update({ where: { id: id }, data: { roleid: value } });
    } else {
      return message.channel.send(
        "❌ Something went wrong. Are you sure that club / value exists?"
      );
    }
  } catch {
    return message.channel.send("❌ There was an error.");
  }

  return message.channel.send("✅ Success!");
};

export const architecture = {
  name: "updateclub",
  aliases: ["uclub", "editclub"],
  module: "Clubs",
  description: "Edit a book club's info.",
  usage: ["updateclub <club id>; <field to change>; <new value>"],
};
