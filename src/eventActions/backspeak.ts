// Get the afk Table stored in the SQLite database
import { Backspeak } from "../databaseFiles/connect.js";

export class backspeakCheckAction {
  static async checkForGame(message) {
    let result = await Backspeak.findOne({ gameName: "backspeak" });

    if (result !== null) {
      var validResp = result.content;
      if (message.content == validResp) {
        message.channel.send(`And the winner is... ${message.author}!`);

        await Backspeak.deleteOne({ gameName: "backspeak" });
      }
    }
  }
}
