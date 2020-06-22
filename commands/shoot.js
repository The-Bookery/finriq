module.exports.execute = async (client, message, args) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  if (getRandomInt(100) == 99 && typeof args[0] !== 'undefined') {
    if (parseInt(args[0])) {
      return await message.channel.send(`_Shoots <@${args[0]}> violently._`);
    } else {
      var name = args.join(' ');
      //Replace with mention if possible
      message.channel.members.forEach((member) => {
        if (
          member.displayName.toLowerCase().indexOf(name.toLowerCase()) != -1 ||
          member.user.username.toLowerCase().indexOf(name.toLowerCase()) != -1
        )
          name = '<@' + member.id + '>';
      });
      if (name != '@everyone') {
        return await message.channel.send(`_Shoots ${name} violently._`);
      } else {
        return await message.channel.send(`_Genocide._`);
      }
    }
  } else {
    return await message.channel.send(
      `Violence is never the answer. Do... you need a \`.hug\`?`
    );
  }
};

module.exports.config = {
  name: 'shoot',
  aliases: ['gun', 'kill'],
  module: 'Fun',
  description: 'Shoots specified user.',
  usage: ['shoot [user]'],
};
