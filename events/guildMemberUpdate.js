const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, oldMember, newMember) => {
  if (oldMember.pending && !newMember.pending) {
    const memberrole = newMember.guild.roles.cache.find(role => role.id === config.roles.member);
    const ranksrole = newMember.guild.roles.cache.find(role => role.id === config.roles.ranksDivider);
    const inforole = newMember.guild.roles.cache.find(role => role.id === config.roles.infoDivider);
    const genrerole = newMember.guild.roles.cache.find(role => role.id === config.roles.genreDivider);
    const pingsrole = newMember.guild.roles.cache.find(role => role.id === config.roles.pingsDivider);
    try {
      await newMember.roles.add(memberrole);
      await newMember.roles.add(ranksrole);
      await newMember.roles.add(inforole);
      await newMember.roles.add(genrerole);
      await newMember.roles.add(pingsrole);
    } catch(err) {
      console.log(err);
    }

    try {
      // Add roles and send welcome message to the welcome channel
      newMember.guild.channels.cache
        .get(config.channels.welcome)
        .send(
          `**Welcome <@${newMember.id}> to The Black Cat Inn, a light-hearted reading-oriented server.** <:frogheart:841861484204130325> 

Go ahead and introduce yourself in <#842107914160046131>. We look forward to chatting with you!

<@&841744471326720060> team come say hello~`
        )
        .then((message) => {
          message.react(config.emotes.wave);
        });
    } catch (err) {
      console.error(err);
    }
  }
};