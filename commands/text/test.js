module.exports = {
  data: {
    name: "test",
    description: "",
  },
  execute: async (msg) => {
    await msg.channel.send("hello");
  },
};
