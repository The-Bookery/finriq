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
  }
};