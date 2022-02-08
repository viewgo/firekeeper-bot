const { getUserEmbed, getLedgerEmbed } = require("../../../tools/index");
const _ = require("lodash");
const { findOneUser, findUsers } = require("../../../server/services");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ledger")
    .setDescription("Look at the top 10 users"),
  execute: async (interaction) => {
    const users = await findUsers();

    const embeds = [];

    embeds.push(getLedgerEmbed(users));

    await interaction.reply({ embeds: embeds, ephemeral: true });
  },
};
