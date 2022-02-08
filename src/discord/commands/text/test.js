const { getUserEmbed } = require("../../../tools/index");
const _ = require("lodash");
const { findOneUser } = require("../../../server/services");

module.exports = {
  data: {
    name: "test",
    description: "",
  },
  execute: async (msg, client) => {
    const users = [];

    const guild = client.guilds.cache.find(
      (g) => g.id === process.env.GUILD_ID
    );

    if (!guild)
      return console.log(
        `Can't find any guild with the ID "${process.env.GUILD_ID}"`
      );

    const members = await guild.members.fetch();

    members.forEach((member) => {
      if (!member.user.bot) users.push(member.user.username);
    });

    await msg.channel.send(users.join(", "));
  },
};
