const moment = require("moment");
const { MessageEmbed } = require("discord.js");

module.exports = {
  getUserEmbed: (user) => {
    const dur = moment.duration(moment().diff(moment(user.lastInvaded)));

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
        {
          name: "ID",
          value: user.id,
          inline: false,
        },
        // { name: "\u200B", value: "\u200B" },
        { name: "Level", value: `${user.level || 0}`, inline: false },
        { name: "Souls", value: `${user.souls || 0}`, inline: false },

        { name: "Deaths", value: `${user.deaths || 0}`, inline: false },
        {
          name: "Spirits Destroyed",
          value: `${user.spirits || 0}`,
          inline: false,
        },
        {
          name: "Hosts Destroyed",
          value: `${user.hosts || 0}`,
          inline: false,
        },

        {
          name: "Last Invaded",
          value: `${dur.minutes() || "N/A"} minutes ago`,
          inline: false,
        }
      );

    //   .setImage("https://i.imgur.com/AfFp7pu.png")
    //   .setTimestamp()
    //   .setFooter({
    // text: "Some footer text here",
    // iconURL: "https://i.imgur.com/AfFp7pu.png",
    //   });

    return embed;
  },
  getUserText: (user) => {
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
  },
};
