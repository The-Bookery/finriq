module.exports.execute = async (client, message) => {
  return await message.channel.send('Hello world!');
};

module.exports.config = {
  name: 'readingstreak',
  aliases: ['streak', 'rs'],
  module: 'Games',
  description: 'Manage your reading streak.',
  usage: ['readingstreak'],
};
