const config = require('../config.json');
const Discord = require('discord.js');

class oneWordStory {
    static async oneWordMessage(message) {
        if (message.channel.id === config.channels.oneWord) {
            var user = message.author;
            let words = message.content.split(/[^A-Za-z'-]/).length;

            message.channel.messages.fetch({limit: 2}).then(res => {
                let lm = res.last();
                if (lm.author == message.author) {
                    let deleteMessage = new Discord.MessageEmbed()
                    .setColor('#ffb980')
                    .setTitle('Message Deleted')
                    .addField(
                        'Message',
                        message.content
                    )
                    .addField(
                        'Reason',
                        'Your message was deleted since it does not meet the requirements of sending one message at a time. Please wait for someone else before adding a word!'
                    );

                    message.delete()
                    .then(() => message.channel.send(deleteMessage)).then(msg => msg.delete({ timeout: 5000 }).catch());
                    console.log(`Message from ${user} deleted in ${message.channel}.`);
                }
            })
            .catch(err => console.error(err));

            if (words.length > 1) {
                let deleteMessage = new Discord.MessageEmbed()
                .setColor('#ffb980')
                .setTitle('Message Deleted')
                .addField(
                    'Message',
                    message.content
                )
                .addField(
                    'Reason',
                    'Your message was deleted since it does not meet the requirements of sending one word per message. Please resend with one word!'
                );

                message.delete()
                .then(() => message.channel.send(deleteMessage))
                .then(msg => msg.delete({ timeout: 5000 }).catch(err => console.error(err)))
                .catch(err => console.error(err));
                console.log(`Message from ${user} deleted in ${message.channel}.`);
            }
        }
    }
}

module.exports = oneWordStory;