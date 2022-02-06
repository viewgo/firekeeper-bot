const countdown = require("./countdown");

module.exports = {
  data: {
    name: "cd",
    description: countdown.description,
  },
  execute: countdown.execute,
};
