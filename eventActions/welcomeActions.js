const config = require('../config.json');

class tosActions {
  static userAcceptsTOS(reaction, user, client) {
    if (
      reaction.message.channel.id === config.channels.tos &&
      reaction._emoji.name === config.emotes.acceptTOS
    ) {
      reaction.message.guild.fetchMember(user.id).then(() => {
        // Add roles and send welcome message to the welcome channel
        client.channels
          .get(config.channels.welcome)
          .send(
            `🎉 **A new member has arrived!** 🎉\nPlease welcome <@${user.id}> to The Bookery <@&693517619457818634>!`
          )
          .then((message) => {
            message.react(config.emotes.wave);
          });
        user.send(`\`\`\`fix
Welcome to The Bookery!\`\`\`
To begin, say hello in <#693498873083330654> and follow our Quick Start Guide below.

**Quick Start Guide**
• You can grab some roles in <#693563108077076490>.
• Introduce yourself with the template pinned in <#711269048591056916>.
• To learn more about the server, check out <#693500724704837653>.

**Reading Groups**
We are a reading server, and we host multiple reading groups! Learn more in the info channel, and join in the self roles channel! Have fun!

**About Me**
I'm Finriq, a custom bot made for The Bookery! I am always growing. Use \`.help\` in <#693561975887888444> for more on what I can do.`);
      });
    }
  }
}

module.exports = tosActions;
