const { getUserEmbed } = require("../../../tools/index");
const _ = require("lodash");
const { findOneUser } = require("../../../server/services");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Check a player's stats")
    .addUserOption((option) =>
      option.setName("target").setDescription("The player to check")
    ),

  execute: async (interaction) => {
    const target = await interaction.options.getMember("target");
    const user = await findOneUser({
      id: target ? target.id : interaction.user.id,
    });
    const embeds = [];

    embeds.push(getUserEmbed(user));

    await interaction.reply({ embeds: embeds, ephemeral: true });
  },
};
