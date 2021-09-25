export = (client, packet) => {
  if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t))
    return;
  const channel = client.channels.cache.get(packet.d.channel_id);
  if (channel.messages.cache.has(packet.d.message_id)) return;
  channel.messages.fetch(packet.d.message_id).then((message) => {
    const emoji = packet.d.emoji.id
      ? `${packet.d.emoji.name}:${packet.d.emoji.id}`
      : packet.d.emoji.name;
    const reaction = message.reactions.cache.get(emoji);
    if (reaction)
      reaction.users.fetch(
        packet.d.user_id,
        client.users.cache.get(packet.d.user_id)
      );
    if (packet.t === "MESSAGE_REACTION_ADD") {
      client.emit(
        "messageReactionAdd",
        reaction,
        client.users.cache.get(packet.d.user_id)
      );
    }
    if (packet.t === "MESSAGE_REACTION_REMOVE") {
      client.emit(
        "messageReactionRemove",
        reaction,
        client.users.cache.get(packet.d.user_id)
      );
    }
  });
};
