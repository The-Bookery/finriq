module.exports.execute = async (client, message) => {
  client.api.applications(client.user.id).guilds('791366170611679272').commands.post({data: {
    name: 'AFK',
    description: 'Put you in AFK mode to let others know you\'re away if they ping you!'
  }});
};

module.exports.config = {
  name: 'addslashes',
  aliases: [],
  module: 'Utility',
  description:
    'Used to add global commands to the slash menu.',
  usage: ['addslashes'],
};
