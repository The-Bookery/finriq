const config = require('../config.json');

module.exports.execute = async (client, message) => {
  if (message.channel.id === config.channels.teamOne) {
    return await message.channel.send('Hey there, member of team one!');
  } else if (message.channel.id === config.channels.teamTwo) {
    return await message.channel.send('Hey there, member of team two!');
  } else if (message.channel.id === config.channels.teamOne) {
    return await message.channel.send('Hey there, member of team three!');
  }
};

module.exports.config = {
  name: 'hello',
  aliases: ['hey', 'greetings'],
  module: 'Utility',
  description: 'Says hello. Use to test if bot is online.',
  usage: ['hello'],
};