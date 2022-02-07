const _ = require("lodash");
const fs = require("fs");

module.exports = {
  data: {
    name: "invade",
    description: "",
  },
  execute: async (msg, client) => {
    const target = msg.content.slice(1).split(" ")[1];

    if (!target) return;
    if (target.toLowerCase() === msg.author.username.toLowerCase()) return;

    let users = JSON.parse(require("fs").readFileSync("./users.json"));
    let user = _.find(users, { username: msg.author.username });
    let targetUser = _.find(
      users,
      (u) => u.username.toLowerCase() === target.toLowerCase()
    );

    console.log(user, targetUser);

    if (!user) return;
    if (!targetUser) return;

    const outcome = Math.floor(Math.random() * 2);

    console.log("OUTCOME:", outcome);

    if (outcome) {
      const amtOfSouls = Math.floor(targetUser.souls / 2);

      users = users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              souls: u.souls + amtOfSouls,
            }
          : u.id === targetUser.id
          ? {
              ...u,
              souls: u.souls - amtOfSouls,
            }
          : u
      );

      const res = await fs.writeFileSync("users.json", JSON.stringify(users));
      console.log(res);

      users = JSON.parse(require("fs").readFileSync("./users.json"));
      user = _.find(users, { id: msg.author.id });

      await msg.channel.send(
        `**HOST OF EMBERS DESTROYED**\n**${user.username}** took possession of **${amtOfSouls}** of **${targetUser.username}'s** souls`
      );
    } else {
      const amtOfSouls = Math.floor(user.souls / 2);

      users = users.map((u) =>
        u.id === targetUser.id
          ? {
              ...u,
              souls: u.souls + amtOfSouls,
            }
          : u.id === user.id
          ? {
              ...u,
              souls: u.souls - amtOfSouls,
            }
          : u
      );

      const res = await fs.writeFileSync("users.json", JSON.stringify(users));
      console.log(res);

      users = JSON.parse(require("fs").readFileSync("./users.json"));
      user = _.find(users, { id: msg.author.id });

      await msg.channel.send(
        `**DARK SPIRIT DESTROYED**\n**${targetUser.username}** took possession of **${amtOfSouls}** of **${user.username}'s** souls`
      );
    }

    // await msg.channel.send(
    //   `**${user.username}** invaded the world of Host of Embers **${targetUser.username}**`
    // );
  },
};
