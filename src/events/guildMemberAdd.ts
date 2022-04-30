import { config } from "../config";
import Discord from "discord.js";
import { InvalidConnectionError } from "sequelize/types";

export = async (client, member) => {
  if (member.user.bot) return;

  const embed = new Discord.MessageEmbed();
  embed.author = {
    name: `${member.user.username}#${member.user.discriminator}`,
    iconURL: member.user.displayAvatarURL(),
  };
  embed.title = `Member Joined`;
  embed.description = `${member.user.username}#${member.user.discriminator} joined the server.`;
  embed.color = config.colors.embedColor;

  client.channels.cache.get(config.channels.logs).send({ embeds: [embed] });

  let welcomeDM = new Discord.MessageEmbed();
  welcomeDM.color = config.colors.embedColor;
  welcomeDM.title = ":books: __**Welcome to The Black Cat Inn!**__ :books:";
  welcomeDM.description =
    "**This has some important information, and we suggest reading through it. It should take less than a minute.**";
  welcomeDM.fields = [
    {
      name: "Gain Access",
      value:
        "If you haven't already, be sure to verify your email and read the rules. You can find the rules popup by clicking the `Complete` button to the right of the message bar on the bottom.",
      inline: false,
    },
    {
      name: "Handy Dandy Channels",
      value: `• You can grab some roles in <#841723422605967381>.
  • Say hey in <#841698453524054016>.
  • To learn more about the server, check out <#841714003440697354>.`,
      inline: false,
    },
    {
      name: "About The Black Cat Inn",
      value: `The Black Cat Inn is a a book club that caters to busy lifestyles as well as is a place for readers to enjoy community.`,
      inline: true,
    },
    {
      name: "Safe Space",
      value: `The Black Cat Inn server is a safe space. We do not allow prejudice or hatred for anyone, explicit discussions, or offensive speech. We understand that some books may contain content that is more adult or offensive, and we ask you refrain from discussing them here.`,
      inline: true,
    },
    {
      name: "Spread the Word",
      value: `If you like The Black Cat Inn and want to share us with your friends, here's a permanent invite link: https://discord.gg/xWnfKfCEEQ.`,
      inline: true,
    },
  ];

  member.send({ embeds: [welcomeDM] }).catch((err) => {
    if (err.name == "DiscordAPIError") {
      welcomeDM.fields.push({
        name: "Note",
        value:
          "This was sent in this channel, likely because you have disabled DMs from servers. This will be automatically deleted after one minute.",
        inline: true,
      });

      return member.guild.channels.cache
        .get(config.channels.welcome)
        .send({ embeds: [welcomeDM] })
        .then((msg) => {
          setTimeout(() => msg.delete().catch(), 600000);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log(err);
  });
};
