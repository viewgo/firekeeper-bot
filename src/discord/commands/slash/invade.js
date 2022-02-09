const _ = require("lodash");
const fs = require("fs");
const moment = require("moment");
const { findOneUser, updateUser } = require("../../../server/services");
const {
  getInvasionOutcome,
  getAmountOfStolenSouls,
  gameSettings,
  getTimeSinceLastInvasion,
} = require("../../../tools");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invade")
    .setDescription("Invade another player")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The player to invade")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    const interactionTarget = await interaction.options.getMember("target");
    const user = await findOneUser({
      id: interaction.user.id,
    });
    const target = await findOneUser({ id: interactionTarget.user.id });

    if (!target) {
      await interaction.reply({
        content: `${interactionTarget.user.username} is not a player.`,
        ephemeral: true,
      });
      return;
    }

    const timeSinceLastInvasion = getTimeSinceLastInvasion(target);

    if (timeSinceLastInvasion <= gameSettings.invasionCooldown) {
      await interaction.reply({
        content: `**${target.username}** was last invaded ${timeSinceLastInvasion} minutes ago.`,
        ephemeral: true,
      });
      return;
    }

    const outcome = getInvasionOutcome();

    if (outcome) {
      const amtOfSouls = getAmountOfStolenSouls(target);

      // UPDATE INVADER
      await updateUser(
        { _id: user._id },
        { $inc: { souls: amtOfSouls, hostsDestroyed: 1 } }
      );
      // UPDATE HOST
      await updateUser(
        { _id: target._id },
        { $inc: { souls: -amtOfSouls, deaths: 1 }, lastInvaded: moment.now() }
      );

      // SEND MESSAGE
      await interaction.reply({
        content: `**HOST OF EMBERS DESTROYED**\n**${
          user.username
        }** took possession of **${amtOfSouls.toLocaleString("en-US")}** of **${
          target.username
        }'s** souls`,
        ephemeral: false,
      });
    } else {
      const amtOfSouls = getAmountOfStolenSouls(user);

      // UPDATE INVADER
      await updateUser({ _id: user._id }, { $inc: { souls: -amtOfSouls } });
      // UPDATE HOST
      await updateUser(
        { _id: target._id },
        {
          $inc: { souls: amtOfSouls, spiritsDestroyed: 1 },
          lastInvaded: moment.now(),
        }
      );

      // SEND MESSAGE
      await interaction.reply({
        content: `**DARK SPIRIT DESTROYED**\n**${
          target.username
        }** took possession of **${amtOfSouls.toLocaleString("en-US")}** of **${
          user.username
        }'s** souls`,
        ephemeral: false,
      });
    }
  },
};
