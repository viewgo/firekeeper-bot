const souls = require("./souls");

module.exports = {
  data: {
    name: "s",
    description: souls.data.description,
  },
  execute: souls.execute,
};
