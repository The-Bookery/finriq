module.exports.execute = async (client, message, args) => {
  return await message.channel.send('Under construction.');
};

module.exports.config = {
  name: 'readathon',
  aliases: ['rat', 'read-a-thon'],
  module: 'Games',
  description: 'Under construction.',
  usage: ['readathon'],
};
