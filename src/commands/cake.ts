export const execute = async (client, message) => {
  return await message.channel.send(Math.random() < 0.5 ? ":cake:" : ":snake:");
};

export const architecture = {
  name: "cake",
  aliases: ["cake", "snake"],
  module: "Fun",
  description:
    "I will choose either :cake: or :snake:. (My version of Russian Roulette)",
  usage: ["cake"],
};
