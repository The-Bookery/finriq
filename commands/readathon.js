const eventTable = require('../databaseFiles/eventTable');
const readAThonUsers = require('../databaseFiles/readAThonUsers');
const moment = require('moment');
const dateformat = 'DD/MM/YYYY hh:mm:ss';

module.exports.execute = async (client, message, args) => {
  switch (args[0].toLowerCase()) {
    case 'start':
      args.shift();
      var cleanargs = args.join(' ');
      var splitargs = cleanargs.split(",");
      var startTime = splitargs[0];
      var endTime = splitargs[1];

      if (moment(startTime, dateformat, true).isValid() == true) {
        startTime = moment.utc(startTime, dateformat, true).format();
      } else {
        return await message.channel.send('There was an issue formatting the start date. Are you sure you used the right format?\n**Got**```' + startTime + '```**Expected** ```' + dateformat + '```');
      }

      if (moment(endTime, dateformat, true).isValid() == true) {
        endTime = moment.utc(endTime, dateformat, true).format();
      } else {
        return await message.channel.send('There was an issue formatting the end date. Are you sure you used the right format?\n**Got**```' + endTime + '```**Expected** ```' + dateformat + '```');
      }

      eventTable.sync().then(() =>
        eventTable.create({
          eventName: 'readathon',
          description: 'This is a test description.',
          start: startTime,
          end: endTime,
        })
        .then(() => {
          try {
            message.channel
              .send(
                `A Read-a-Thon event has been scheduled!`
              )
              .then((msg) => msg.delete({ timeout: 5000 }).catch());
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => {
          if (err.name == 'SequelizeUniqueConstraintError' && args[1] != 'auto') {
            return message.channel.send("There seems to already be a read a thon event planned!");
          }
          console.error('Readathon sequelize error: ', err);
        })
      );
    break;
    case '':
    default:
      return await message.channel.send(`I don't recognize that subcommand! Please try again.`);
  }
};

module.exports.config = {
  name: 'readathon',
  aliases: ['rat'],
  module: "Events",
  description: 'Read-a-thon commands! Remembers people\'s reading goals, keeps track of participants, and more!',
  usage: ['readathon [start | join <goal> | update <goal> | add <number of books read> | remove <number of books read> | time]']
};
