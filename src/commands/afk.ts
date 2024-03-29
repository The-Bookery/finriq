// Get the afk Table stored in the MongoDB database
import { prisma } from "../utils/database.js";

export const execute = async (client, message, args) => {
  try {
    if (
      message.content.toLowerCase().indexOf("good") != -1 &&
      message.content.toLowerCase().indexOf("night") != -1 &&
      message.content.toLowerCase().indexOf("readers") != -1
    ) {
      //pass
    } else {
      message.delete();
    }
  } catch (err) {
    console.log("Delete error" + err);
  }

  const sender = message.author;

  var afkMessage;

  if (args[1] == "auto") {
    afkMessage = args[0];
  } else if (args.length > 0) {
    afkMessage = args.join(" ");
  } else {
    afkMessage = "They didn't tell us where they went...";
  }

  let result = await prisma.afks.findUnique({ where: { user: sender.id } });

  if (result === null) {
    const afkObject = {
      message: afkMessage,
      user: sender.id,
      cooldown: Date.now(),
      date: Date.now(),
    };

    await prisma.afks.create({ data: afkObject });

    try {
      message.channel
        .send(
          `I have marked you as AFK, <@${sender.id}>. Anyone who pings you will be notified you are away.\n\`\`\`AFK Message: ${afkMessage}\`\`\``
        )
        .then((msg) => setTimeout(() => msg.delete().catch(), 10000));
    } catch (err) {
      console.log(err);
    }
  } else {
    await prisma.afks.delete({ where: { user: sender.id } });

    await message.channel
      .send(
        `Welcome back, ${
          message.member.nickname
            ? message.member.nickname
            : message.author.username
        }!`
      )
      .then((delmessage) => setTimeout(() => delmessage.delete(), 5000))
      .catch("Error sending message.");
  }
};

export const architecture = {
  name: "afk",
  aliases: ["afk", "away"],
  module: "Utility",
  description:
    "I will mark you as being away. When people tag you, they will be notified that you are not present.",
  usage: ["afk [message]"],
};
