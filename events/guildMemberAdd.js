const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, member) => {
  if(member.user.bot) return;
  
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL())
    .setTitle(`Member Joined`)
    .setDescription(`${member.user.username}#${member.user.discriminator} joined the server.`)
    .setColor(config.colors.embedColor);
  client.channels.cache.get(config.channels.logs).send(embed);

  let welcomeDM = new Discord.MessageEmbed()
    .setColor(config.colors.embedColor)
    .setTitle(':books: __**Welcome to The Old Black Cats!**__ :books:')
    .setDescription('**This has some important information, and we suggest reading through it. It should take less than a minute.**')
    .addField(
      'Gain Access',
      'If you haven\'t already, be sure to verify your email and read the rules. You can find the rules popup by clicking the `Complete` button to the right of the message bar on the bottom.'
    )
    .addField(
      'Handy Dandy Channels',
      `• You can grab some roles in <#841723422605967381>.
  • Say hey in <#841698453524054016>.
  • To learn more about the server, check out <#841714003440697354>.`
    )
    .addField(
      'About The Old Black Cats',
      `The Old Black Cats is a a book club that caters to busy lifestyles as well as is a place for readers to enjoy community.`,
      true
    )
    .addField(
      'Safe Space',
      `The Old Black Cats server is a safe space. We do not allow prejudice or hatred for anyone, explicit discussions, or offensive speech. We understand that some books may contain content that is more adult or offensive, and we ask you refrain from discussing them here.`,
      true
    )
    .addField(
      'Spread the Word',
      `If you like The Old Black Cats and want to share us with your friends, here's a permanent invite link: https://discord.gg/xWnfKfCEEQ.`,
      true
    );
  member.send(welcomeDM).catch((err) => {
    if (err.name == "DiscordAPIError") {
      welcomeDM.addField(
        'Note',
        'This was sent in this channel, likely because you have disabled DMs from servers. This will be automatically deleted after one minute.'
      );

      return member.guild.channels.cache.get(config.channels.welcome)
      .send(welcomeDM).then(msg => {
        msg.delete({timeout: 600000});
      }).catch(err => {
        console.log(err);
      });
    }

    console.log(err);
  });
};