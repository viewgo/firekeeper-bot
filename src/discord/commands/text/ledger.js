const _ = require("lodash");
const moment = require("moment");
const { findUsers } = require("../../../server/services");
const { getUserText, getUserEmbed } = require("../../../tools/index");

module.exports = {
  data: {
    name: "ledger",
    description: "",
  },
  execute: async (msg) => {
    const users = await findUsers();

    const embeds = [];

    users.forEach((user) => {
      embeds.push(getUserEmbed(user));
    });

    await msg.channel.send({ embeds: embeds });
  },
};
