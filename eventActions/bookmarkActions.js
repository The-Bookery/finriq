const config = require('../config.json');
const Discord = require('discord.js');

class bookmarkActions {
  static async bookmarkMessage(user, reaction) {
		if (reaction._emoji.id === config.emotes.bookmark) {
			const workingMessage = reaction.message;
			const booksEmote = "📚";
			const bookmarkEmbed = new Discord.RichEmbed()
				.setColor('#0F9BF1')
				.setTitle(`${booksEmote} The Bookery Bookmark ${booksEmote}`)
				.setDescription('You asked to bookmark this post from The Bookery server.')
				.addField('From', workingMessage.author, true)
				.addField('Link to Message', `[Jump to Message](${workingMessage.url})`, true)
				.addField('Channel', workingMessage.channel);
			const messageChunks = workingMessage.content.match(/[\s\S]{1,1024}/g);

      for (const chunk of messageChunks) {
        bookmarkEmbed.addField('Full Message', chunk);
      }

      // Add link to attachment
      if (workingMessage.attachments.array().length > 0) {
        const attchmnt = workingMessage.attachments.array()[0].url;
        console.log(attchmnt);
        bookmarkEmbed.addField('Attachment', attchmnt).setImage(attchmnt);
      }

      user.send(bookmarkEmbed);
    }
  }
}

module.exports = bookmarkActions;
