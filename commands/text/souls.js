const _ = require("lodash");

module.exports = {
  data: {
    name: "souls",
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

    await msg.channel.send(
      `**${user.username}**\nLevel: *${
        user.level
      }*\nSouls: *${user.souls.toLocaleString("en-US")}*`
    );
  },
};
