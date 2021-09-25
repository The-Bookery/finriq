import { config } from '../config';

function capitalizeFLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const execute = async (client, message) => {
  const adjective = config.adjectives[Math.floor(Math.random() * config.adjectives.length)];
  const noun = config.nouns[Math.floor(Math.random() * config.nouns.length)];
  const verb = config.verbs[Math.floor(Math.random() * config.verbs.length)];
  const adverb = config.adverbs[Math.floor(Math.random() * config.adverbs.length)];

  message.channel.send(
    `${capitalizeFLetter(adjective)} ${noun} ${verb} ${adverb}.`
  );
};

export const architecture = {
  name: "prompt",
  aliases: ["prompt"],
  module: "Writing",
  description:
    "Get a randomly generated sentence to help you find inspiration for writing!",
  usage: ["prompt"],
};
