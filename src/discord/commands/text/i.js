const invade = require("./invade");

module.exports = {
  data: {
    name: "i",
    description: invade.data.description,
  },
  execute: invade.execute,
};
