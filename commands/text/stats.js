const _ = require("lodash");
const moment = require("moment");
const { getUserText } = require("../../tools");

module.exports = {
  data: {
    name: "stats",
    description: "",
  },
  execute: async (msg) => {
    const target = msg.content.slice(1).split(" ")[1];

    const users = JSON.parse(require("fs").readFileSync("./users.json"));

    console.log(target);

    if (target) {
      var user = _.find(
        users,
        (u) => u.username.toLowerCase() === target.toLowerCase()
      );

      if (!user) return;
    } else {
      var user = _.find(users, { id: msg.author.id });
    }

    const dur = moment.duration(moment().diff(moment(user.lastInvaded)));

    await msg.channel.send(getUserText(user));
  },
};
