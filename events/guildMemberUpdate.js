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
          `🎉 **A new member has arrived!** 🎉\nPlease welcome <@${newMember.id}> to the **Black Cat Reading Corner** <@&${config.roles.welcome}> team!\nWe're so glad you've joined. :blush: **Introduce yourself here!** Please include what you'd like to be called, your preferred pronouns, your age (or whether you're below 18 years old or not), and a little about yourself.`
        )
        .then((message) => {
          message.react(config.emotes.wave);
        });
    } catch (err) {
      console.error(err);
    }
  }
};