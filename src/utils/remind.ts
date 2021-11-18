/*import Discord from "discord.js";
import { Reminder } from "../databaseFiles/connect";
import { config } from "../config";

async function remind(client, date, reminder, shouldCatchUp = false) {
  let userToRemind = await client.users.fetch(reminder.dataValues.whoToRemind);
  let color, description;

  if (shouldCatchUp) {
    color = "#FF4500";
    description = `Whoops! Sorry for being late, I was probably down for maintenance. 😅
		Anyway, you can now bump the server using \`!d bump\`. I hope it's not too late. 🤐`;
  } else {
    color = "#FFCC00";
    description = `Hello! You can now bump the server using \`!d bump\`
		Thanks! Off I go. 😄`;
  }

  const remindMessage = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`Bump Reminder`)
    .setDescription(description);
  remindMessage.color = color;

  userToRemind.send(remindMessage);

  if (!reminder.dataValues.recurring) {
    await Reminder.deleteOne({ id: reminder.dataValues.id });
  } else {
    const amountToAdd = new Date(new Date().getHours() + 2);

    await Reminder.update(
      { whenToRemind: amountToAdd },
      {
        where: {
          id: reminder.dataValues.id,
        },
      }
    );
  }
}

export async function scanForReminders(client, guild) {
  const currentDate = new Date();
  const reminders = await Reminder.find();

  if (reminders) {
    let difference;
    reminders.forEach(async (reminder) => {
      difference = currentDate.getTime() - reminder.dataValues.whenToRemind;
      if (difference > -1 * 30000) {
        remind(client, currentDate, reminder);
      }
    });
  }
}

export async function catchUp(client) {
  const currentDate = new Date();
  const reminders = await Reminder.find();

  if (reminders) {
    let difference;
    reminders.forEach(async (reminder) => {
      difference = currentDate.getTime() - reminder.dataValues.whenToRemind;
      if (difference > 0) {
        remind(client, currentDate, reminder, true);
      }
    });
  }
}
*/