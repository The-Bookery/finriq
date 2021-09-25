export const execute = async (client, message) => {
  return await message.channel.send(Math.random() < 0.5 ? ":bread:" : ":fire:");
};

export const architecture = {
  name: "toast",
  aliases: ["fire", "france"],
  module: "Fun",
  description:
    "I will choose either :bread: or :fire:. (Toast version of `.coffee`)",
  usage: ["toast"],
};
