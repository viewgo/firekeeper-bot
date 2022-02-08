const { getUserEmbed } = require("../../../tools/index");
const _ = require("lodash");
const { findOneUser } = require("../../../server/services");

module.exports = {
  data: {
    name: "stats",
    description: "",
  },
  execute: async (msg) => {
    const target = msg.content.slice(1).split(" ")[1];
    let user = null;

    console.log(target);

    if (target) {
      // FIND USER BY USERNAME
      user = await findOneUser({
        username: new RegExp(`^${target}$`, "i"),
      });
      if (!user) user = await findOneUser({ id: target });

      if (!user) return;
    } else {
      // FIND USER BY USERNAME
      user = await findOneUser({ username: msg.author.username });
      // IF NOT FOUND BY USERNAME, FIND BY ID
      if (!user) user = await findOneUser({ id: msg.author.id });

      if (!user) return;
    }

    console.log(user);

    const embeds = [];

    embeds.push(getUserEmbed(user));

    await msg.channel.send({ embeds: embeds, ephemeral: true });
    await msg.delete();
  },
};
