// Get the afk Table stored in the SQLite database
const Clubs = require('../databaseFiles/clubTable.js');
const config = require('../config.json');

module.exports.execute = async (client, message, args) => {
  if(!message.member.roles.cache.some(r => r.id === config.roles.admin)) return message.channel.send('❌ This is an admin-only command.');

  if (!args || args == '') return message.channel.send('You must include the ID of the club you wish to delete.');
  if (!parseInt(args[0])) return message.channel.send('You must include the ID of the club you wish to delete. (You can find this by using `.club <club name>`.)')

  Clubs.sync().then(() => {
    Clubs.destroy({
      where: {
        id: parseInt(args[0]),
      },
    }).then((result) => {
      if (result == 1) return message.channel.send('✅ Success!');
      else return message.channel.send('❌ Something went wrong. Are you sure that club exists?');
    }).catch(err => {
      return message.channel.send('❌ An error occured.');
    });
  });
};

module.exports.config = {
	name: 'deleteclub',
	aliases: ['dclub'],
  module: 'Clubs',
	description: 'Delete a book club.',
	usage: ['addclub <name> <description>']
};