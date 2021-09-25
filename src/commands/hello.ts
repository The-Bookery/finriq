export const execute = async (client, message) => {
  return await message.channel.send("Hey there!");
};

export const architecture = {
  name: "hello",
  aliases: ["hey", "greetings"],
  module: "Utility",
  description: "Says hello. Use to test if bot is online.",
  usage: ["hello"],
};
