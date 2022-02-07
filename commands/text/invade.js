const _ = require("lodash");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  data: {
    name: "invade",
    description: "",
  },
  execute: async (msg, client) => {
    const target = msg.content.slice(1).split(" ")[1];

    if (!target) return;

    if (
      target.toLowerCase() === msg.author.username.toLowerCase() ||
      target === msg.author.id
    )
      return;

    let users = JSON.parse(require("fs").readFileSync("./users.json"));
    let user = _.find(users, { username: msg.author.username });
    let targetUser = _.find(
      users,
      (u) =>
        u.username.toLowerCase() === target.toLowerCase() || u.id === target
    );

    if (!user) return;
    if (!targetUser) return;

    const dur = moment.duration(moment().diff(moment(targetUser.lastInvaded)));

    let minutes = dur.minutes();

    if (minutes <= 60) {
      await msg.channel.send(
        `**${targetUser.username}** was last invaded ${minutes} minutes ago.`
      );
      return;
    }

    const outcome = Math.floor(Math.random() * 2);

    if (outcome) {
      const amtOfSouls = Math.floor(targetUser.souls / 2);

      users = users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              souls: u.souls + amtOfSouls,
              spirits: u.spirits ? u.spirits + 1 : 1,
            }
          : u.id === targetUser.id
          ? {
              ...u,
              souls: u.souls - amtOfSouls,
              lastInvaded: moment.now(),
              deaths: u.deaths ? u.deaths + 1 : 1,
            }
          : u
      );

      await fs.writeFileSync("users.json", JSON.stringify(users));

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
              lastInvaded: moment.now(),
              hosts: u.hosts ? u.hosts + 1 : 1,
            }
          : u.id === user.id
          ? {
              ...u,
              souls: u.souls - amtOfSouls,
            }
          : u
      );

      await fs.writeFileSync("users.json", JSON.stringify(users));

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
