// Get the afk Table stored in the SQLite database
import { Clubs } from "../databaseFiles/connect.js";

export const execute = async (client, message, args) => {
  if (args.length == 0) {
    var list = "";
    let result = await Clubs.find();

    await result.forEach((club) => {
      list = list + `\n🔸 **${club.clubName}**: ${club.description}`;
    });

    if (list == "") list = "\nLooks like there's no clubs here yet.";
    return message.channel.send(
      `📚 Here is a list of our active book clubs! 📚${list}`
    );
  } else {
    let club = await Clubs.findOne({ prettyName: args.join("").toLowerCase() });

    if (!club || club.length == 0) return message.channel.send("Cannot find that club.");
    return message.channel.send(
      `📚 Info about this book club 📚\n**ID**: ${club._id}\n**Name**: ${club.clubName}\n**Description**: ${club.description}`
    );
  }
};

export const architecture = {
  name: "bookclubs",
  aliases: ["bookclubs", "bookclub", "club"],
  module: "Clubs",
  description: "I will list all the active book clubs for you.",
  usage: ["clubs [book club]"],
};
