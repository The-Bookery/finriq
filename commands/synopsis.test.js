// Get the game Table stored in the SQLite database
const Backspeak = require('../databaseFiles/gameTable.js');

module.exports.execute = async (client, message, args) => {
  /*switch(args[0]) {
    case "start":
      if (isEmpty(game)) {
        message.channel.send("React to this message with a :pencil2: to join the game! The game won't start until at least " + (args[1] ? args[1] : 2) + " players join! Once the game has started, players can join without reacting to this. Simply start following the instructions and your points will be added to the leaderboard!");
        args[1] = parseInt(args[1]);
        var lastMessage;
        message.channel.fetchMessages({ limit: 1 }).then(messages => {
          lastMessage = messages.first();
          lastMessage.react("✏");
          const filter = () => {
            return true;
          };
          lastMessage.awaitReactions(filter, {max:1+(args[1] ? args[1] : 2), time:300000,errors:['time']}).then(collected => {
            message.channel.send("<@" + game.owner.id + "> We have enough players! Start the first round by running `.synopsis round`!");
          })
          .catch(collected => {
            message.channel.send("Not enough players.");
          });
        });
      } else {
        message.channel.send("There is already a game running. If you are the owner of the current game, run `.synopsis end` to end the current game.");
      }
      break;
    case "round":
      if (!isEmpty(game) && !game.roundInProgress && message.author.id == game.owner.id) {
        game.round++;
        game.roundInProgress = true;
        message.channel.send("__**Round " + game.round + "**__\nYou can join in at any time, simply by following the instructions. You will automatically be added to the leaderboard.");
        message.channel.send("Here comes your prompt! _(Cue drumroll)_");
        setTimeout(function () {
          bookNo++;
          game.book = books[bookNo % books.length];
          message.channel.send("The title is _" + game.book.title + "_!\nMake up a synopsis for this story and DM it to me. You have five minutes.");
          game.summaries = [{author:false,summary:game.book.summary}];
          game.acceptingSummaries = true;
          setTimeout(function () {
            game.acceptingSummaries = false;
            message.guild.roles.forEach(role => {
              if (role.id == "693502791788003401") {
                message.channel.overwritePermissions(role, {'SEND_MESSAGES': false});
              }
            });
            message.channel.send("Time's up!\n\nI'm about to send all the synopses you wonderful writers came up with, but I'll throw in the actual synopsis of the book. When I do that, you're going to vote for one synopsis that you think is the real one.");
            shuffle(game.summaries);
            game.summaryMessages = [];
            for (var i in game.summaries) {
              message.channel.send((parseInt(i) + 1) + ". " + game.summaries[i].summary);
              message.channel.fetchMessages({ limit: 1 }).then(messages => {
                lastMessage = messages.first();
                addSummaryMessage(lastMessage.id);
                lastMessage.react("✅");
              });
            }
            message.channel.send("Can we give all of those wonderful synopses a big round of applause? :clap: :clap: :clap:");
            setTimeout(function () {
              message.channel.send("Thank you.");
              message.channel.send("Now, vote for the synopsis you think is the real one by ticking the ✅. You have forty-five seconds. If you guess correctly, you get 2 points! You can vote for your own, but it's worth less points than guessing the right one and it might give you away.\nIf you haven't been playing up till now, you can join in here! The title of the book is _" + game.book.title + "_. Can you guess which synopsis is the correct one?");
              message.guild.roles.forEach(role => {
                if (role.id == "693502791788003401") {
                  message.channel.overwritePermissions(role, {'SEND_MESSAGES': true});
                }
              });
              setTimeout(function () {
                message.channel.send("The results are in! It turns out that this was the real summary:\n\"" + game.book.summary + "\"\nThe real book was written by " + game.book.author + ". Great job, though, that was fun!");
                game.roundInProgress = false;
                if (!(game.leaderboard)) game.leaderboard = {};
                //Calculate leaderboard
                game.voted = [];
                for (var s in game.summaries) {
                  if (game.summaries[s].author) { //Made up
                    if (!game.leaderboard[game.summaries[s].author]) {
                      game.leaderboard[game.summaries[s].author] = 0;
                    }
                    message.channel.messages.forEach(msg => {
                      if (msg.id == game.summaryMessages[s]) {
                        msg.reactions.forEach(reaction => {
                          if (game.voted.indexOf(game.summaries[s].author.id) && game.summaries[s].author.id != msg.author.id) {
                            game.leaderboard[game.summaries[s].author] += reaction.count - 1;
                            game.voted.push(game.summaries[s].author.id);
                          }
                        });
                      }
                    });
                  } else { //Real
                    message.channel.messages.forEach(msg => {
                      if (msg.id == game.summaryMessages[s]) {
                        msg.reactions.forEach(reaction => {
                          reaction.users.forEach(user => {
                            if (!user.bot && game.voted.indexOf(user.id)) {
                              if (!game.leaderboard[user]) {
                                game.leaderboard[user] = 2;
                              } else {
                                game.leaderboard[user]+=2;
                              }
                              game.voted.push(user.id);
                            }
                          });
                        });
                      }
                    });
                  }
                }
                game.leaderboard = sortProperties(game.leaderboard);
                var leaderboard = "Here are the rankings so far:\n";
                var l = 1;
                for (var player in game.leaderboard) {
                  leaderboard += "\n" + l + ". " + player + ": " + game.leaderboard[player] + " points";
                  l++;
                }
                if (isEmpty(game.leaderboard)) {
                  leaderboard += "No players have earned points. Come on, y'all! You can do better than that.";
                }
                leaderboard += "\n\nYou can view the leaderboard at any time by running `.synopsis leaderboard`.";
                message.channel.send(leaderboard);
                message.channel.send("<@" + game.owner.id + "> You can start a new round by running `.synopsis round` or you can end the game now with `.synopsis end`.");
              }, 45000);
            }, 5000);
          }, 300000);
        }, 5000);
      } else if (game.roundInProgress) {
        message.channel.send("There is already a round in progress. Finish the round before starting a new one.");
      } else if (!isEmpty(game)) {
        message.channel.send("You are not the owner of the game. Only the owner of the game can start a new round.");
      } else {
        message.channel.send("There is no game running. Run `.synopsis start` to start a new game!");
      }
      break;
    case "leaderboard":
        var leaderboard = "Here are the rankings so far:\n";
        var l = 1;
        for (var player in game.leaderboard) {
          leaderboard += "\n" + l + ". " + player + ": " + game.leaderboard[player] + " points";
          l++;
        }
        if (isEmpty(game.leaderboard)) {
          leaderboard += "\nNo players have earned points. Come on, y'all! You can do better than that.";
        }
        message.channel.send(leaderboard);
      break;
    case "end":
      if (game.roundInProgress == false) {
        if (isEmpty(game)) {
          message.channel.send("There is no game running. Run `.synopsis start` to start a new game!");
        } else if (message.author.id == game.owner.id || message.author.id == "530925903757443094") {
          game = {};
          message.channel.send("The game is over! Thanks for playing!");
        } else {
          message.channel.send("Only the game owner can end the game.");
        }
      } else {
        message.channel.send("Please wait until the round is over to end the game.");
      }
      break;
    default:
      message.channel.send('Hmm... I don\'t know that command. Try `.help` to get a list of commands.');
      break;
  }*/
  channel.message.send('Under construction.');
};

module.exports.config = {
  name: 'synopsis',
  aliases: ['syn'],
  module: 'Games',
  description:
    "When the game starts, I will give everyone a random book title. Each player will DM me a made-up summary of what the book is about.\nOnce everyone has sent in their summaries, I'll list them in the chat where everyone can see them, but no one will see who posted which summary. In addition, I will throw in the _real_ summary of the book. Everyone will vote on what they think the real summary is.\nOnce people have voted, I tally up the points. If someone thinks your summary is the real one, you get one point. If you guess the correct summary, you get three points. Points carry over into the next round until the `.synopsis end` command is run.\nSound fun? run `.synopsis start [min-players]` to start!.",
  usage: ['synopsis [start | round | leaderboard | end]'],
};
