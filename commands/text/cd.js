const countdown = require("./countdown");

module.exports = {
  data: {
    name: "cd",
    description: countdown.data.description,
  },
  execute: countdown.execute,
};
