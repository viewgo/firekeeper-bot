const _ = require("lodash");
const fs = require("fs");
const soulsNeeded = require("../../soulsneeded.json");

module.exports = {
  data: {
    name: "levelup",
    description: "",
  },
  execute: async (msg) => {
    console.log();
    let users = JSON.parse(require("fs").readFileSync("./users.json"));
    let user = _.find(users, { id: msg.author.id });

    console.log(
      `${msg.author.username}'s level: ${user.level}\nSouls needed: ${
        soulsNeeded[user.level + 1]
      }`
    );

    console.log(soulsNeeded);

    if (user.souls >= soulsNeeded[user.level + 1]) {
      users = JSON.parse(require("fs").readFileSync("./users.json"));
      user = _.find(users, { id: msg.author.id });
      users = users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              level: u.level + 1,
              souls: u.souls - soulsNeeded[user.level + 1],
            }
          : u
      );

      fs.writeFileSync("users.json", JSON.stringify(users));

      users = JSON.parse(require("fs").readFileSync("./users.json"));
      user = _.find(users, { id: msg.author.id });

      await msg.channel.send({
        content: `*Let these souls, withdrawn from their vessels, Manifestations of disparity, Elucidated by fire, Burrow deep within me, Retreating to a darkness beyond the reach of flame, Let them assume a new master, Inhabiting ash, casting themselves upon new forms...*\n\n**${
          msg.author.username
        }** spent ${soulsNeeded[user.level - 1]} souls and is now level ${
          user.level
        }.`,
        ephemeral: false,
      });
    } else {
      await msg.channel.send({
        content: `**${
          msg.author.username
        }'s souls:** *${user.souls.toLocaleString(
          "en-US"
        )}*\nSouls required for level ${user.level + 1}: ${
          soulsNeeded[user.level + 1]
        }`,
        ephemeral: false,
      });
    }
  },
};
