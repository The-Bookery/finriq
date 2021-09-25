// Get the game Table stored in the SQLite database
import { Backspeak } from "../databaseFiles/connect.js";
import { config } from '../config';

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

  const gameObject = {
    gameName: "backspeak",
    content: words.slice(0, 10).reverse().join(" "),
    started: Date.now(),
  };

  await Backspeak.insertOne(gameObject);

  try {
    message.channel.send("**3...**");
    setTimeout(function () {
      message.channel.send("**2...**");
      setTimeout(function () {
        message.channel.send("**1...**");
        setTimeout(function () {
          message.channel.send(words.slice(0, 10).join(" "));
        }, 1000);
      }, 1000);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
}

function timedifference(timestamp1, timestamp2) {
  timestamp1 = new Date(parseInt(timestamp1));
  timestamp2 = new Date(parseInt(timestamp2));

  var difference = timestamp2.getTime() - timestamp1.getTime();

  difference = Math.floor(difference / 1000 / 60);

  return difference;
}

export const execute = async (client, message) => {
  let result = await Backspeak.findOne({ gameName: "backspeak" });

  if (result === null) {
    gameStart(message);
  } else {
    if (timedifference(result.started, Date.now()) >= 1) {
      await Backspeak.deleteOne({ gameName: "backspeak" });

      gameStart(message);
    } else {
      message.channel.send(
        "A game is already going on! Wait a minute for it to time out before starting a new one."
      );
    }
  }
};

export const architecture = {
  name: "backspeak",
  aliases: ["backspeak"],
  module: "Games",
  description:
    "Start a game of backspeak! After three seconds I will send a random list of words. Try to be the first to send the same list of words backwards. Remember that it's case sensitive!",
  usage: ["backspeak"],
};
