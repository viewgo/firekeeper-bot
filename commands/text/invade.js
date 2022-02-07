const _ = require("lodash");

module.exports = {
  data: {
    name: "invade",
    description: "",
  },
  execute: async (msg, client) => {
    const target = msg.content.slice(1).split(" ")[1];

    if (!target) return;
    if (target.toLowerCase() === msg.author.username.toLowerCase()) return;

    const users = JSON.parse(require("fs").readFileSync("./users.json"));
    const user = _.find(users, { username: msg.author.username });
    const targetUser = _.find(
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
      await msg.channel.send(
        `**HOST OF EMBERS DESTROYED**\n**${user.username}** took possession of **${amtOfSouls}** of **${targetUser.username}'s** souls`
      );
    } else {
      const amtOfSouls = Math.floor(user.souls / 2);
      await msg.channel.send(
        `**PHANTOM VANQUISHED**\n**${targetUser.username}** took possession of **${amtOfSouls}** of **${user.username}'s** souls`
      );
    }

    // await msg.channel.send(
    //   `**${user.username}** invaded the world of Host of Embers **${targetUser.username}**`
    // );
  },
};
