// Get the afk Table stored in the SQLite database
const Clubs = require('../databaseFiles/clubTable.js');

module.exports.execute = async (client, message, args) => {
  Clubs.sync().then(() => {
    if (args.length == 0) {
      var list = "";
      Clubs.findAll().then((result) => {
        result.forEach(club => {
          list = list + `\n🔸 **${club.clubName}**: ${club.description}`;
        });
        if (list == '') list = '\nLooks like there\'s no clubs here yet.';
        return message.channel.send(`📚 Here is a list of our active book clubs! 📚${list}`);
      });
    } else {
      Clubs.findAll({
        where: {
          prettyName: args.join('').toLowerCase(),
        },
      }).then((club) => {
        if (club.length == 0) return message.channel.send('Cannot find that club.');
        club = club[0];
        return message.channel.send(`📚 Info about this book club 📚\n**ID**: ${club.id}\n**Name**: ${club.clubName}\n**Description**: ${club.description}`);
      });
    }
  });
};

module.exports.config = {
	name: 'bookclubs',
	aliases: ['bookclubs', 'bookclub', 'club'],
  module: 'Clubs',
	description: 'I will list all the active book clubs for you.',
	usage: ['clubs [book club]']
};