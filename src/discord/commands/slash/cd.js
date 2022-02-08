const { SlashCommandBuilder } = require("@discordjs/builders");
const countdown = require("./countdown");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cd")
    .setDescription("Countdown timer for Elden Ring release"),
  execute: countdown.execute,
};
