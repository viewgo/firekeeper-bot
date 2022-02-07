const ledger = require("./ledger");

module.exports = {
  data: {
    name: "l",
    description: ledger.data.description,
  },
  execute: ledger.execute,
};
