module.exports.execute = async (client, message) => {
  client.api.applications(client.user.id).guilds('791366170611679272').commands.post({data: {
    "name": 'afk',
    "description": 'Lets other members know you\'ve gone away when they ping you.',
    "options": [
      {
        "name": "message",
        "description": "Will notify the person pinging you where you've gone.",
        "type": 3,
        "required": false
      }
  ]
  }});
};

module.exports.config = {
  name: 'addslash',
  aliases: [],
  module: 'Utility',
  description:
    'Adds slashes for testing.',
  usage: ['addslash'],
};