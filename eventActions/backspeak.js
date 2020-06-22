// Get the afk Table stored in the SQLite database
const Backspeak = require('../databaseFiles/gameTable.js');

class backspeakCheckAction {
  static async checkForGame(message) {
    Backspeak.sync().then(() =>
      Backspeak.findAll({
        where: {
          gameName: 'backspeak',
        },
      }).then((result) => {
        if (result.length > 0) {
          var validResp = result[0].content;
          if (message.content == validResp) {
            message.channel.send(
              'And the winner is... ' + message.author + '!'
            );
            Backspeak.destroy({
              where: {
                gameName: 'backspeak',
              },
            });
          }
        }
      })
    );
  }
}

module.exports = backspeakCheckAction;
