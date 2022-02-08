require("dotenv").config();
const _ = require("lodash");
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");

const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const discord = require("../discord/discord");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("server.js  :: Connected successfully");
});
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server.js  :: Server listening on PORT " + port);
});
