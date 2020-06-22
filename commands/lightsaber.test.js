// Get the game Table stored in the SQLite database
const Lightsaber = require('../databaseFiles/gameTable.js');

async function gameStart(invited, message) {
  Backspeak.create({
    gameName: 'lightsaber',
    content: message.author.id,
    started: Date.now(),
  })
    .then(() => {
      try {
        message.channel.send(
          `⚔️ **<@${invited}>!** You have been challenged to a duel by <@${message.author.id}>! ⚔️`
        );
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.error('Lighsaber error: ', err);
    });
}

module.exports.execute = async (client, message, args) => {
  await message.channel.send('Under construction.');
};

module.exports.config = {
  name: 'lightsaber',
  aliases: ['lightsaber'],
  module: 'Games',
  description:
    'Start a game of lightsaber! Challenge a friend and take turns doing moves.\nSlash - Reliable but easily blocked\nStab - Less reliable but harder to block\nBlock - Reliable and gives you another slightly weaker turn. Harder to block stab.\nDodge - Reliable and beats stab and slash although slightly weaker for slash.\nForce - Charge up your next move. Leaves you vulnerable.',
  usage: ['lightsaber [user]'],
};
