const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, oldMember, newMember) => {
  if (oldMember.pending && !newMember.pending) {
    const memberrole = newMember.guild.roles.cache.find(role => role.id === '719660584806776884');
    const ranksrole = newMember.guild.roles.cache.find(role => role.id === '719993182670159945');
    const inforole = newMember.guild.roles.cache.find(role => role.id === '719677020677603361');
    const genrerole = newMember.guild.roles.cache.find(role => role.id === '719991192393351179');
    const pingsrole = newMember.guild.roles.cache.find(role => role.id === '725074194739757068');
    try {
      await newMember.roles.add(memberrole);
      await newMember.roles.add(ranksrole);
      await newMember.roles.add(inforole);
      await newMember.roles.add(genrerole);
      await newMember.roles.add(pingsrole);
    } catch(err) {
      console.log(err);
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL())
      .setTitle(`Member Joined`)
      .setDescription(`${member.user.username}#${member.user.discriminator} joined the server.`)
      .setColor('#ffb980');
    client.channels.cache.get(config.channels.logs).send(embed);

    try {
      // Add roles and send welcome message to the welcome channel
      member.guild.channels.cache
        .get(config.channels.welcome)
        .send(
          `🎉 **A new member has arrived!** 🎉\nPlease welcome <@${member.id}> to the **Black Cat Reading Corner** <@&738420217847218295> team!\nWe're so glad you've joined. :blush: **Introduce yourself here!** Please include what you'd like to be called, your preferred pronouns, your age (or whether you're below 18 years old or not), and a little about yourself.`
        )
        .then((message) => {
          message.react(config.emotes.wave);
        });
    } catch (err) {
      console.error(err);
    }
  }
};