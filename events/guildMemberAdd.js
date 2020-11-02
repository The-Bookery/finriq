const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, member) => {
  try {
    console.log(member.user);
    if(member.user.bot) return;
    // Add roles and send welcome message to the welcome channel
    console.log(config.channels.welcome);
    member.guild.channels.cache
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
      .setDescription('**This has some important information, and we suggest reading through it. It should take less than a minute.**')
      .addField(
        'Handy Dandy Channels',
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
        `If you like The Bookery and want to share us with your friends, here's a permanent invite link: https://discord.gg/tfhg7TW.`
      )
      .addField(
        'Our Website',
        `We have an official website! We post articles on our blog, list some of our favorite partners (along with a partner application), and a ban appeal form if you end up getting banned and you want to appeal it. Check us out!
https://bookerycommunity.com/`
      );
    member.send(welcomeDM).catch((err) => {
      if (err.name == "DiscordAPIError") {
        welcomeDM.addField(
          'Note',
          'This was sent in this channel, likely because you have disabled DMs from servers. This will be automatically deleted after one minute.'
        );

        return member.guild.channels.cache.get(config.channels.welcome)
        .send(welcomeDM).then(msg => msg.delete(600000).catch(err => {console.log("Error! " + err);}));
      }

      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }
};