export const execute = async (client, message) => {
  try {
    message.channel.send("**Rock...**");
    setTimeout(function () {
      message.channel.send("**Paper...**");
      setTimeout(function () {
        message.channel.send("**Scissors!!!**");
      }, 4000);
    }, 4000);
  } catch (err) {
    console.log(err);
  }
};

export const architecture = {
  name: "rockpaperscissors",
  aliases: ["rps"],
  module: "Games",
  description: "Starts a rock paper scissors game.",
  usage: ["rockpaperscissors"],
};
