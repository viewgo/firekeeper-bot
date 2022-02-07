const _ = require("lodash");

module.exports = {
  data: {
    name: "souls",
    description: "",
  },
  execute: async (msg) => {
    const users = JSON.parse(require("fs").readFileSync("./users.json"));
    const user = _.find(users, { id: msg.author.id });

    await msg.channel.send(
      `**${msg.author.username}'s souls:** *${user.souls.toLocaleString(
        "en-US"
      )}*`
    );
  },
};