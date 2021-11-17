import { config } from "../config";
import Discord from "discord.js";

export = async (client, member) => {
  if (member.user.bot) return;

  const embed = new Discord.MessageEmbed();
  embed.author = {
    name: `${member.user.username}#${member.user.discriminator}`,
    iconURL: member.user.displayAvatarURL(),
  };
  embed.title = `Member Left`;
  embed.description = `${member.user.username}#${member.user.discriminator} left the server.`;
  embed.color = config.colors.embedColor;

  const fetchedKicks = await member.guild.fetchAuditLogs({
    // get audit log entry for kicks
    limit: 1,
    type: "MEMBER_KICK",
  });

  const fetchedBans = await member.guild.fetchAuditLogs({
    // get audit log entry for bans
    limit: 1,
    type: "MEMBER_BAN_ADD",
  });

  const kickLog = fetchedKicks.entries.first(); // get the first kick log
  const banLog = fetchedBans.entries.first(); // get the first ban log

  if (
    kickLog &&
    kickLog.target.id === member.user.id &&
    kickLog.createdAt > member.joinedAt
  ) {
    // is the kick log valid?

    var reason = kickLog.reason ? kickLog.reason : "*No reason provided.*";

    embed.description = `${member.user.username}#${member.user.discriminator} was kicked by ${kickLog.executor.tag}.`;
    embed.fields.push({ name: "Reason", value: reason, inline: false });
  } else {
    // kick log is not valid
    if (
      banLog &&
      banLog.target.id === member.user.id &&
      banLog.createdAt > member.joinedAt
    ) {
      // is ban log valid?

      var reason = banLog.reason ? banLog.reason : "*No reason provided.*";

      embed.description = `${member.user.username}#${member.user.discriminator} was banned by ${banLog.executor.tag}.`;
      embed.fields.push({ name: "Reason", value: reason, inline: false });
    }
  }

  return await client.channels.cache
    .get(config.channels.logs)
    .send({ embeds: [embed] });
};
