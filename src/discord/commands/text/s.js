const stats = require("./stats");

module.exports = {
  data: {
    name: "s",
    description: stats.data.description,
  },
  execute: stats.execute,
};
