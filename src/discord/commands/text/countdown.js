const moment = require("moment");
require("dotenv").config();

module.exports = {
  data: {
    name: "countdown",
    description: "",
  },
  execute: async (msg) => {
    if (msg.channelId !== process.env.ELDENRING_CHANNEL_ID) return;

    const date = "2022-02-25T00:00:00";

    const dur = moment.duration(moment(date).diff(moment()));

    let years = dur.years();
    let months = dur.months();
    let days = dur.days();
    let hours = dur.hours();
    let minutes = dur.minutes();
    let seconds = dur.seconds();

    var d = {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };

    await msg.channel.send({
      content: `**Elden Ring Releases In**\n*${d.days} days ${d.hours} hours ${d.minutes} minutes*`,
      ephermeral: false,
    });
  },
};
