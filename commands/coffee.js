module.exports.execute = async (client, message) => {
  return await message.channel.send(
    Math.random() < 0.5 ? ':coffee:' : ':coffin:'
  );
};

module.exports.config = {
  name: 'coffee',
  aliases: ['cappuccino', 'coffin', 'croulette'],
  module: 'Fun',
  description:
    'I will choose either :coffee: or :coffin:. (My version of Russian Roulette)',
  usage: ['coffee'],
};
