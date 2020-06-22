module.exports.execute = async (client, message) => {
  return await message.channel.send(
    Math.random() < 0.5 ? ':beverage_box:' : ':fox:'
  );
};

module.exports.config = {
  name: 'juice',
  aliases: ['juice', 'juicebox', 'fox'],
  module: 'Fun',
  description:
    'I will choose either :beverage_box: or :fox:. (My version of Russian Roulette)',
  usage: ['juice'],
};
