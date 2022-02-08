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

module.exports = {
  data: {
    name: "invade",
    description: "",
  },
  execute: async (msg, client) => {
    const target = msg.content.slice(1).split(" ")[1];
    let user = null;
    let targetUser = null;

    // EXIT IF NO TARGET
    if (!target) return;

    // EXIT IF TARGET IS AUTHOR
    if (
      target.toLowerCase() === msg.author.username.toLowerCase() ||
      target === msg.author.id
    )
      return;

    // FIND USER BY USERNAME
    user = await findOneUser({ username: msg.author.username });
    // IF NOT FOUND BY USERNAME, FIND BY ID
    if (!user) user = await findOneUser({ id: target });

    // FIND TARGET
    targetUser = await findOneUser({
      username: new RegExp(`^${target}$`, "i"),
    });
    if (!targetUser) targetUser = await findOneUser({ id: target });

    // EXIT IF AUTHOR OR TARGET ARE NOT FOUND
    if (!user || !targetUser) return;

    const timeSinceLastInvasion = getTimeSinceLastInvasion(targetUser);

    if (timeSinceLastInvasion <= gameSettings.invasionCooldown) {
      await msg.channel.send(
        `**${targetUser.username}** was last invaded ${timeSinceLastInvasion} minutes ago.`
      );
      return;
    }

    const outcome = getInvasionOutcome();

    if (outcome) {
      const amtOfSouls = getAmountOfStolenSouls(targetUser);

      // UPDATE INVADER
      const invader = await updateUser(
        { _id: user._id },
        { $inc: { souls: amtOfSouls, hostsDestroyed: 1 } }
      );
      // UPDATE HOST
      const host = await updateUser(
        { _id: targetUser._id },
        { $inc: { souls: -amtOfSouls, deaths: 1 }, lastInvaded: moment.now() }
      );

      // SEND MESSAGE
      await msg.channel.send(
        `**HOST OF EMBERS DESTROYED**\n**${user.username}** took possession of **${amtOfSouls}** of **${targetUser.username}'s** souls`
      );
      await msg.delete();
    } else {
      const amtOfSouls = getAmountOfStolenSouls(user);

      // UPDATE INVADER
      const invader = await updateUser(
        { _id: user._id },
        { $inc: { souls: -amtOfSouls } }
      );

      console.log(amtOfSouls);

      // UPDATE HOST
      const host = await updateUser(
        { _id: targetUser._id },
        {
          $inc: { souls: amtOfSouls, spiritsDestroyed: 1 },
          lastInvaded: moment.now(),
        }
      );

      // SEND MESSAGE
      await msg.channel.send(
        `**DARK SPIRIT DESTROYED**\n**${targetUser.username}** took possession of **${amtOfSouls}** of **${user.username}'s** souls`
      );
      await msg.delete();
    }
  },
};
