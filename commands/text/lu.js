const levelup = require("./levelup");

module.exports = {
  data: {
    name: "lu",
    description: levelup.data.description,
  },
  execute: levelup.execute,
};
