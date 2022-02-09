const moment = require("moment");
const { MessageEmbed } = require("discord.js");

exports = module.exports = {};

exports.getLedgerEmbed = (users) => {
  users = users
    .sort((a, b) => {
      if (a.level === b.level) {
        return b.souls - a.souls;
      } else {
        return b.level - a.level;
      }
    })
    .slice(0, 10);

  // const obj = { usernames: [], levels: [], souls: [] };

  // users.forEach((u) => {
  //   obj.usernames.push(u.username);
  //   obj.levels.push(u.level);
  //   obj.souls.push(u.souls);
  // });

  // const embed = new MessageEmbed()
  //   .setColor("#0099ff")
  //   .setTitle("Ledger")
  //   .addFields({
  //     name: "User",
  //     value: obj.usernames.map((i) => `${i}\xa0\xa0\xa0\n`).join(""),
  //     inline: true,
  //   })
  //   .addFields({
  //     name: "Level",
  //     value: obj.levels.map((i) => `${i}\xa0\xa0\xa0\n`).join(""),
  //     inline: true,
  //   })
  //   .addFields({
  //     name: "Souls",
  //     value: obj.souls
  //       .map((i) => `${i.toLocaleString("en-US")}\xa0\xa0\xa0\n`)
  //       .join(""),
  //     inline: true,
  //   })
  //   .setFooter({
  //     text: "\u2800".repeat(40 /*any big number works too*/) + "|",
  //   });

  const embed = new MessageEmbed().setColor("#0099ff").setTitle("Ledger");

  users.forEach((u, index) => {
    embed.addFields({
      name: `${index + 1}. ${u.username}`,
      value: `**➤ Level:** ${u.level}\n**➤ Souls:** ${u.souls.toLocaleString(
        "en-US"
      )}\n**➤ Kills:** ${
        u.hostsDestroyed + u.spiritsDestroyed
      }\n**➤ Deaths:** ${u.deaths}\n`,
      inline: true,
    });
  });

  return embed;
};

exports.getUserEmbed = (user) => {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(user.username)
    //   .setURL("https://discord.js.org/")
    //   .setAuthor({
    //     name: "Some name",
    //     iconURL: "https://i.imgur.com/AfFp7pu.png",
    //     url: "https://discord.js.org",
    //   })
    //   .setDescription("Some description here")
    //   .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    .addFields(
      { name: "Level", value: `${user.level || 0}`, inline: true },
      {
        name: "Souls",
        value: `${user.souls.toLocaleString("en-US") || 0}`,
        inline: true,
      },
      { name: "Deaths", value: `${user.deaths || 0}`, inline: true },
      { name: "Vigor", value: `${user.attributes.vigor || 0}`, inline: true },
      {
        name: "Attunement",
        value: `${user.attributes.attunement || 0}`,
        inline: true,
      },
      {
        name: "Endurance",
        value: `${user.attributes.endurance || 0}`,
        inline: true,
      },
      {
        name: "Vitality",
        value: `${user.attributes.vitality || 0}`,
        inline: true,
      },
      {
        name: "Strength",
        value: `${user.attributes.strength || 0}`,
        inline: true,
      },
      {
        name: "Dexterity",
        value: `${user.attributes.dexterity || 0}`,
        inline: true,
      },
      {
        name: "Intelligence",
        value: `${user.attributes.intelligence || 0}`,
        inline: true,
      },
      { name: "Faith", value: `${user.attributes.faith || 0}`, inline: true },
      { name: "Luck", value: `${user.attributes.luck || 0}`, inline: true },

      {
        name: "Spirits Destroyed",
        value: `${user.spiritsDestroyed || 0}`,
        inline: true,
      },
      {
        name: "Hosts Destroyed",
        value: `${user.hostsDestroyed || 0}`,
        inline: true,
      },
      {
        name: "Last Invaded",
        value: `${module.exports.getTimeSinceLastInvasion(user)} minutes ago`,
        inline: false,
      },
      { name: "\u200B", value: "\u200B" }
    )

    //   .setImage("https://i.imgur.com/AfFp7pu.png")
    //   .setTimestamp()
    .setFooter({
      text: user.id,
      // iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  return embed;
};

exports.getUserText = (user) => {
  const dur = moment.duration(moment().diff(moment(user.lastInvaded)));

  return `**${user.username}**\nID: *${user.id}*\nLevel: *${
    user.level
  }*\nSouls: *${user.souls.toLocaleString("en-US")}*\nDeaths: *${
    user.deaths || 0
  }*\nDark Spirits Destroyed: *${
    user.spirits || 0
  }*\nHost of Embers Destroyed: *${
    user.hosts || 0
  }*\nLast Invaded: *${dur.minutes()} minutes ago*`;
};

exports.getInvasionOutcome = () => {
  // return 1;
  return Math.floor(Math.random() * 2);
};

exports.getAmountOfStolenSouls = (user) => {
  return Math.floor(user.souls / 2);
};

exports.getTimeSinceLastInvasion = (user) => {
  return moment().diff(moment(user.lastInvaded), "minutes");
};

exports.gameSettings = {
  invasionCooldown: 60, // in minutes
};
