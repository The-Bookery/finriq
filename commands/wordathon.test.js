module.exports.execute = async (client, message, args) => {
  return await message.channel.send('Under construction.');
};

module.exports.config = {
  name: 'wordathon',
  aliases: ['wat', 'word-a-thon'],
  module: 'Games',
  description: 'Under construction.',
  usage: ['wordathon'],
};
