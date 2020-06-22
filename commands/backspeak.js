// Get the game Table stored in the SQLite database
const Backspeak = require('../databaseFiles/gameTable.js');
const config = require('../config.json');

var words = config.backspeak;

async function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

async function gameStart(message) {
  shuffle(words);

  Backspeak.create({
    gameName: 'backspeak',
    content: words.slice(0, 10).reverse().join(' '),
    started: Date.now(),
  })
    .then(() => {
      try {
        message.channel.send('**3...**');
        setTimeout(function () {
          message.channel.send('**2...**');
          setTimeout(function () {
            message.channel.send('**1...**');
            setTimeout(function () {
              message.channel.send(words.slice(0, 10).join(' '));
            }, 1000);
          }, 1000);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.error('Backspeak error: ', err);
    });
}

function timedifference(timestamp1, timestamp2) {
  timestamp1 = new Date(parseInt(timestamp1));
  timestamp2 = new Date(parseInt(timestamp2));

  var difference = timestamp2.getTime() - timestamp1.getTime();

  difference = Math.floor(difference / 1000 / 60);

  return difference;
}

module.exports.execute = async (client, message) => {
  Backspeak.sync().then(() =>
    Backspeak.findAll({
      where: {
        gameName: 'backspeak',
      },
    }).then((result) => {
      if (result.length < 1) {
        gameStart(message);
      } else {
        if (timedifference(result[0].started, Date.now()) >= 1) {
          Backspeak.destroy({
            where: {
              gameName: 'backspeak',
            },
          }).then(() => {
            gameStart(message);
          });
        } else {
          message.channel.send(
            'A game is already going on! Wait a minute for it to time out before starting a new one.'
          );
        }
      }
    })
  );
};

module.exports.config = {
  name: 'backspeak',
  aliases: ['backspeak'],
  module: 'Games',
  description:
    "Start a game of backspeak! After three seconds I will send a random list of words. Try to be the first to send the same list of words backwards. Remember that it's case sensitive!",
  usage: ['backspeak'],
};
