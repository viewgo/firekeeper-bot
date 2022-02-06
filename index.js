const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.slashCommands = new Collection();
client.textCommands = new Collection();

const slashCommandFiles = fs
  .readdirSync("./commands/slash")
  .filter((file) => file.endsWith(".js"));
const textCommandFiles = fs
  .readdirSync("./commands/text")
  .filter((file) => file.endsWith(".js"));

for (const file of slashCommandFiles) {
  const command = require(`./commands/slash/${file}`);
  client.slashCommands.set(command.data.name, command);
}
for (const file of textCommandFiles) {
  const command = require(`./commands/text/${file}`);
  client.textCommands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
  console.log(slashCommandFiles);
});

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith("!")) return;

  const commandName = msg.content.slice(1);
  const command = client.textCommands.get(commandName);

  if (!command) return;

  try {
    await command.execute(msg);
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.slashCommands.get(interaction.commandName);

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

client.login(process.env.DISCORD_TOKEN);
