// Get the afk Table stored in the SQLite database
import { prisma } from "../utils/database.js";

export class backspeakCheckAction {
  static async checkForGame(message) {
    let result = await prisma.backspeak.findUnique({
      where: { gameName: "backspeak" },
    });

    if (result !== null) {
      var validResp = result.content;
      if (message.content == validResp) {
        message.channel.send(`And the winner is... ${message.author}!`);

        await prisma.backspeak.delete({ where: { gameName: "backspeak" } });
      }
    }
  }
}
