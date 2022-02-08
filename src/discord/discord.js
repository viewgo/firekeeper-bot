require("dotenv").config();
const _ = require("lodash");
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { addOneUser, findOneUser, updateUser } = require("../server/services");

const discord = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
const commandKey = "!";

discord.slashCommands = new Collection();
discord.textCommands = new Collection();

const slashCommandFiles = fs
  .readdirSync(__dirname + "/commands/slash")
  .filter((file) => file.endsWith(".js"));
const textCommandFiles = fs
  .readdirSync(__dirname + "/commands/text")
  .filter((file) => file.endsWith(".js"));

for (const file of slashCommandFiles) {
  const command = require(__dirname + `/commands/slash/${file}`);
  discord.slashCommands.set(command.data.name, command);
}
for (const file of textCommandFiles) {
  const command = require(__dirname + `/commands/text/${file}`);
  discord.textCommands.set(command.data.name, command);
}

discord.once("ready", () => {
  console.log("discord.js :: Fire Keeper Bot Ready!");
});

discord.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(commandKey)) {
    const commandName = msg.content.slice(1).split(" ");
    const command = discord.textCommands.get(commandName[0]);

    if (!command) return;

    try {
      await command.execute(msg, discord); // EXECUTE COMMAND
    } catch (error) {
      console.log(error);
    }
  } else {
    // FIND AUTHOR OF POST
    const user = await findOneUser({ username: msg.author.username });

    if (user) {
      // ADD ONE SOUL PER POST
      updateUser({ _id: user._id }, { $inc: { souls: 1 } }).catch((err) => {
        console.log("Error updating user", err);
      });
    } else {
      // IF NO USER, CREATE ONE
      addOneUser({ id: msg.author.id, username: msg.author.username }).catch(
        (err) => {
          console.log("Error adding user", err);
        }
      );
    }
  }
});

discord.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = discord.slashCommands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

discord.login(process.env.DISCORD_TOKEN);

module.exports = discord;
