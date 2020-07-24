module.exports.execute = async (client, message) => {
  return await message.channel.send(Math.random() < 0.5 ? 'They pass!' : 'They fail!');
};

module.exports.config = {
  name: 'gradepaper',
  aliases: ['grade'],
  module: "Fun",
  description: 'I will choose a person\'s grade! For Mask.',
  usage: ['gradepaper [name]']
};
