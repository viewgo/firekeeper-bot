const express = require("express");
const userModel = require("./models/user");
const weaponModel = require("./models/weapon");
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

app.get("/addweapons", async (req, res) => {
  let succeeded = 0;
  let failed = 0;
  let promises = [];

  const weaponsJSON = JSON.parse(
    require("fs").readFileSync(__dirname + "/ds1weapons.json")
  );

  console.log("STARTING WEAPONS IMPORT");

  weaponsJSON.forEach((w) => {
    const weaponToAdd = {
      name: w.name,
      attack: w.atk,
      defense: w.def,
      effects: w.effects,
      requirements: w.req,
      scale: w.scale,
      durability: w.durability,
      weight: w.weight,
      attackTypes: w.attackTypes,
      obtained: w.obtained,
      weaponType: w.weaponType,
    };

    var weapon = new weaponModel(weaponToAdd);

    promises.push(
      weapon
        .save()
        .then((res) => {
          succeeded++;
          console.log(`${weaponToAdd.name} added successfully.\n`);
        })
        .catch((err) => {
          failed++;
          console.log(`FAILED TO ADD: ${weaponToAdd.name}\n`);
        })
    );
  });

  console.log(promises);

  Promise.all(promises).then(() =>
    res.send(`Success: ${succeeded} // Failed: ${failed}`)
  );
});

module.exports = app;
