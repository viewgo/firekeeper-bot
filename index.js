const _ = require("lodash");
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();

let users = require(`./users.json`);

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});
const commandKey = "!";

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
  console.log("Fire Keeper Bot Ready!");
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(commandKey)) {
    const commandName = msg.content.slice(1).split(" ");
    const command = client.textCommands.get(commandName[0]);

    if (!command) return;

    try {
      await command.execute(msg, client);
    } catch (error) {
      console.error(error);
    }
  } else {
    const user = _.find(users, { id: msg.author.id });

    if (user) {
      console.log(user);
      users = users.map((u) =>
        u.id === user.id
          ? { ...u, username: msg.author.username, souls: u.souls + 1 }
          : u
      );

      fs.writeFileSync("users.json", JSON.stringify(users));
    } else {
      users.push({
        id: msg.author.id,
        username: msg.author.username,
        souls: 0,
        level: 1,
      });

      fs.writeFileSync("users.json", JSON.stringify(users));
    }
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
