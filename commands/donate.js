const Discord = require('discord.js');
const config = require('../config.json');

module.exports.execute = async (client, message) => {
  const donateEmbed = new Discord.MessageEmbed()
    .setTitle('Donate to my Work')
    .setDescription('Donating will go towards funding me and this project. Thank you for your interest! :heart:')
    .addField(
      'Buy Me a Coffee',
      'https://www.buymeacoffee.com/zmontgo'
    );
  
  return await message.channel.send(donateEmbed);
};

module.exports.config = {
  name: 'donate',
  aliases: ['fund'],
  module: 'Utility',
  description: 'Donate a bit to promote my work and fund costs for running the bot.',
  usage: ['donate'],
};
