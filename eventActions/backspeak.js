// Get the afk Table stored in the SQLite database
const Backspeak = require('../databaseFiles/connect.js').Games;

class backspeakCheckAction {
  static async checkForGame(message) {
    
    let result = await Backspeak.findOne({ gameName: 'backspeak' });
    
    if (result !== null) {
      var validResp = result.content;
      if (message.content == validResp) {
        message.channel.send(
          `And the winner is... ${message.author}!`
        );
        
        await Backspeak.deleteOne({ gameName: 'backspeak' });
      }
    }
  }
}

module.exports = backspeakCheckAction;
