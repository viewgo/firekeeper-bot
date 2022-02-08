const express = require("express");
const userModel = require("./models/user");
const { addOneUser, findOneUser, findUsers } = require("./services");
const app = express();

app.post("/users", async (request, response) => {
  try {
    const user = await addOneUser(request.body);
    response.send(user);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.get("/user", async (request, response) => {
  try {
    const user = await findOneUser(request.body);
    response.send(user);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.get("/users", async (request, response) => {
  try {
    const users = await findUsers(request.body);
    response.send(users);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = app;
