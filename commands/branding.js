const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
  if (args.length) {
    if (args[0] == 'colors') {
      const brandEmbed = new Discord.RichEmbed()
        .setTitle('The Bookery Color Scheme')
        .setDescription(
          'Color light: #e100e2\nColor medium: #750384\nColor dark: #090526'
        )
        .attachFiles([
          'https://bookery.codingprojects.org/images/color_scheme.png',
        ])
        .setImage('attachment://color_scheme.png')
        .setColor('#750384');
      return await message.channel.send(brandEmbed);
    } else if (args[0] == 'logo' || args[0] == 'icon') {
      const brandEmbed = new Discord.RichEmbed()
        .setTitle('The Bookery Logo')
        .attachFiles([
          'https://bookery.codingprojects.org/images/bookery-logo.png',
        ])
        .setImage('attachment://bookery-logo.png')
        .setColor('#750384');
      return await message.channel.send(brandEmbed);
    } else {
      const brandEmbed = new Discord.RichEmbed()
        .setTitle('The Bookery Branding')
        .setDescription(
          'Color light: #e100e2\nColor medium: #750384\nColor dark: #090526'
        )
        .setThumbnail(
          'https://bookery.codingprojects.org/images/bookery-logo.png'
        )
        .attachFiles([
          'https://bookery.codingprojects.org/images/color_scheme.png',
        ])
        .setImage('attachment://color_scheme.png')
        .setColor('#750384');
      return await message.channel.send(brandEmbed);
    }
  } else {
    const brandEmbed = new Discord.RichEmbed()
      .setTitle('The Bookery Branding')
      .setDescription(
        'Color light: #e100e2\nColor medium: #750384\nColor dark: #090526'
      )
      .setThumbnail(
        'https://bookery.codingprojects.org/images/bookery-logo.png'
      )
      .attachFiles([
        'https://bookery.codingprojects.org/images/color_scheme.png',
      ])
      .setImage('attachment://color_scheme.png')
      .setColor('#750384');
    return await message.channel.send(brandEmbed);
  }
};

module.exports.config = {
  name: 'brand',
  aliases: ['colors', 'branding', 'colorscheme'],
  module: 'Utility',
  description: "The Bookery's branding and color scheme!",
  usage: ['brand [colors | logo]'],
};
