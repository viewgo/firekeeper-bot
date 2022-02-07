const _ = require("lodash");
const moment = require("moment");
const { getUserText } = require("../../tools");

module.exports = {
  data: {
    name: "ledger",
    description: "",
  },
  execute: async (msg) => {
    const users = JSON.parse(require("fs").readFileSync("./users.json"));

    let text = ``;

    users.forEach((user) => {
      const dur = moment.duration(moment().diff(moment(user.lastInvaded)));

      text = text + getUserText(user) + `\n\n`;
    });

    await msg.channel.send(text);
  },
};
