const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (member) => {
  console.log("Yes");
  console.log(member);
  member.guild.members.fetch(member.id).then((user) => {
    if(user.author.bot) return console.log("bot");
    // Add roles and send welcome message to the welcome channel
    member.guild.channels
      .get(config.channels.welcome)
      .send(
        `🎉 **A new member has arrived!** 🎉\nPlease welcome <@${member.id}> to The Bookery <@&693517619457818634>!`
      )
      .then((message) => {
        message.react(config.emotes.wave);
      });

    let welcomeDM = new Discord.MessageEmbed()
      .setColor('#750384')
      .setTitle(':books: __**Welcome to The Bookery!**__ :books:')
      .addField(
        'Quick Start Guide',
        `• You can grab some roles in <#693563108077076490>.
• Introduce yourself with the template pinned in <#711269048591056916>.
• To learn more about the server, check out <#693500724704837653>.`
      )
      .addField(
        'About The Bookery',
        `The Bookery is a community dedicated to the creation, consumption, admiration, and discussion of literature. We strive to create an environment where readers can find a community of people who have their same interests and talk or read together.`
      )
      .addField(
        'Safe Space',
        `The Bookery is a safe space. We do not allow prejudice or hatred for anyone, explicit discussions, or offensive speech. We understand that some books may contain content that is more adult or offensive, and we ask you refrain from discussing them here.`
      )
      .addField(
        'About Me',
        `I'm Finriq, a custom bot made for The Bookery! I am always growing. Use \`.help\` in <#693561975887888444> for more on what I can do.`
      )
      .addField(
        'Spread the Word',
        `If you like The Bookery and want to share us with your friends, here's a permanent invite link: https://discord.gg/2cEWaym.`
      );
    member.send(welcomeDM).catch((err) => {
      if (err.name == "DiscordAPIError" && timedifference(result[0].cooldown, Date.now()) >= 3) {
        welcomeDM.addField(
          'Note',
          'This was sent in this channel, likely because you have disabled DMs from servers. This will be automatically deleted after thirty seconds.'
        );

        return member.guild.channels.get(config.channels.welcome)
        .send(welcomeDM).then(msg => msg.delete(30000).catch());
      }

      console.log(err);
    });
  });
};