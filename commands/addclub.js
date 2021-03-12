// Get the afk Table stored in the SQLite database
const Clubs = require('../databaseFiles/connect.js').Clubs;
const config = require('../config.json');

module.exports.execute = async (client, message, args) => {
  if(!message.member.roles.cache.some(r => r.id === config.roles.admin)) return message.channel.send('❌ This is an admin-only command.');

  if (!args || args == '') return message.channel.send('You must include a name, a role, and a description, seperated by semicolons.');

  let cleanargs = new Array(3);

  args = args.join(' ').split(';');

  if (args.length < 3) {
    if (!args[0] || args[0] == '') return message.channel.send('You must include a name!');
    if (!args[1] || args[1] == '') return message.channel.send('You must include a role! Make sure you use either it\'s name or ID.');
    if (!args[2] || args[2] == '') return message.channel.send('You must include a description!');
    return;
  }

  let i = 0;

  args.forEach(arg => {
    cleanargs[i] = arg.trim();
    i++;
  });

  var name = cleanargs[0];
  var cleanname = cleanargs[0].split(' ').join('').toLowerCase();
  var role = cleanargs[1].split('<').join('').split('>').join('').split('@').join('').split('&').join('');
  var description = cleanargs[2];

  if (name == '') return message.channel.send('Club\'s name cannot be empty!');
  if (role == '') return message.channel.send('Club\'s role cannot be empty!');
  if (description == '') return message.channel.send('Club\'s description cannot be empty!');

  let checkrole;
  if (!parseInt(role)) checkrole = message.guild.roles.cache.find(x => x.name === role);
  else checkrole = message.guild.roles.cache.find(x => x.id === role);

  if (checkrole == undefined) return message.channel.send('Role cannot be found.');

  let uniqueCheck = await Clubs.findOne({ clubName: name });

  if (uniqueCheck === null) {
    clubObject = {
      clubName: name,
      prettyName: cleanname,
      roleID: role,
      description: description
    }
    
    await Clubs.insertOne(clubObject);

    return message.channel.send('✅ Success!');
  } else {
    return message.channel.send('❌ A club with that name already exists.');
  }
};

module.exports.config = {
	name: 'addclub',
	aliases: ['aclub'],
  module: 'Clubs',
	description: 'Add a new book club.',
	usage: ['addclub <name>; <role>; <description>']
};