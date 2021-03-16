const config = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, member) => {
  if(member.user.bot) return;

  const embed = new Discord.MessageEmbed()
  .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL())
  .setTitle(`Member Left`)
  .setDescription(`${member.user.username}#${member.user.discriminator} left the server.`)
  .setColor(config.colors.embedColor);

  try {
    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_KICK',
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const kickLog = fetchedLogs.entries.first();
  
    // Let's perform a coherence check here and make sure we got *something*
    if (kickLog) {
      // We now grab the user object of the person who kicked our member
      // Let us also grab the target of this action to double check things
      const { executor, target } = kickLog;

      // And now we can update our output with a bit more information
      // We will also run a check to make sure the log we got was for the same kicked member
      if (target.id === member.id) {
        embed.setDescription(`${member.user.username}#${member.user.discriminator} was kicked by ${executor.tag}.`);
      } else {
        embed.setDescription(`${member.user.username}#${member.user.discriminator} left the server; audit log fetch was inconclusive.`);
      }
    }
  } catch(err) {
    console.log(err);
  } finally {
    return await client.channels.cache.get(config.channels.logs).send(embed);
  }
};
