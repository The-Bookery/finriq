class starboardActions {
  static async checkStar(user, reaction) {
    console.log(reaction);
		if (reaction._emoji && reaction._emoji.name === config.emotes.star) {
      var stars = reaction.count;
      var username = user.username;
      var avatar = user.avatar;
      var link = reaction.message.id;
      console.log(link);
    }
  }
}

module.exports = starboardActions;