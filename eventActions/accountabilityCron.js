const config = require('../config.json');
const Discord = require('discord.js');

class accountabilityCronJob {
  static async check(client) {
    let accountabilityCheck = new Discord.RichEmbed()
    .setColor('#750384')
    .setTitle(':books: __**Daily Accountability Check**__ :books:')
    .addField(
        'Check In',
        'Tell me how you\'re doing with your goals! Are you on track? Make sure to send a message and discuss!'
    )
    .addField(
        'Motivational Quote',
        config.motivationalquotes[Math.floor(Math.random()*config.motivationalquotes.length)]
    );

    const accountabilityChannel = config.channels.accountability;
    client.channels.get(accountabilityChannel).send(accountabilityCheck);
  }
}

module.exports = accountabilityCronJob;