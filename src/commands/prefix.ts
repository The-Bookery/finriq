import { prisma } from "../utils/database";

export const execute = async (client, message, args) => {
  args = args[0];

  if (!args)
    return await message.channel.send(
      ":x: Please include a prefix you wish to use."
    );
  if (args.length > 2)
    return await message.channel.send(
      ":x: Your prefix must not be longer than two characters."
    );

  var exists = await prisma.prefixes.findUnique({
    where: { guild: message.guild.id },
  });

  if (!exists) {
    var prefixObject = {
      guild: message.guild.id,
      prefix: args,
    };

    await prisma.prefixes.create({ data: prefixObject });
  } else {
    prisma.prefixes.upsert({
      update: {
        prefix: args,
      },
      where: {
        guild: message.guild.id,
      },
      create: {
        guild: message.guild.id,
        prefix: args,
      },
    });
  }

  return await message.channel.send(
    `:white_check_mark: Success! New prefix is \`${args}\`.`
  );
};

export const architecture = {
  name: "prefix",
  aliases: ["setprefix"],
  module: "Admin",
  description: "Change the prefix for the bot.",
  usage: ["prefix <new prefix>"],
  admin: true,
};
