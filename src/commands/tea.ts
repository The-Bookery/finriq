export const execute = async (client, message) => {
  return await message.channel.send(
    Math.random() < 0.5 ? ":tea:" : ":deciduous_tree:"
  );
};

export const architecture = {
  name: "tea",
  aliases: ["chai", "tree", "troulette"],
  module: "Fun",
  description:
    "I will choose either :tea: or :deciduous_tree:. (Tea-drinker's version of the coffee command)",
  usage: ["tea"],
};
