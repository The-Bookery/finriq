module.exports.execute = async (client, message) => {
  return await message.channel.send(
    Math.random() < 0.5 ? ':cockroach:' : ':cocktail:'
  );
};

module.exports.config = {
  name: 'bug juice',
  aliases: [],
  module: 'Fun',
  description:
    'I will choose either :cockroach: or :cocktail:. (My version of Russian Roulette)',
  usage: ['coffee'],
};
