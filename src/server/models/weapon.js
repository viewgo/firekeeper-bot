const mongoose = require("mongoose");
const moment = require("moment");

const WeaponSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  attack: {
    physical: { type: Number, default: 0 },
    magic: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    lightning: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
  },
  defense: {
    physical: { type: Number, default: 0 },
    magic: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    lightning: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
  },
  effects: {
    poison: { type: Number || null, default: null },
    bleed: { type: Number || null, default: null },
    divine: { type: Number || null, default: null },
    occult: { type: Number || null, default: null },
  },
  requirements: {
    strength: { type: Number || null, default: null },
    dexterity: { type: Number || null, default: null },
    intelligence: { type: Number || null, default: null },
    faith: { type: Number || null, default: null },
  },
  scale: {
    strength: { type: String || null, default: null },
    dexterity: { type: String || null, default: null },
    intelligence: { type: String || null, default: null },
    faith: { type: String || null, default: null },
  },
  weaponType: {
    type: String || null,
    enum: [
      null,
      "Dagger",
      "Straight Sword",
      "Greatsword",
      "Ultra Greatsword",
      "Curved Sword",
      "Katana",
      "Curved Greatsword",
      "Piercing Sword",
      "Axe",
      "Great Axe",
      "Hammer",
      "Great Hammer",
      "Fist",
      "Spear",
      "Halberd",
      "Whip",
      "Bow",
      "Greatbow",
      "Crossbow",
      "Catalyst",
      "Flame",
      "Talisman",
    ],
  },
  durability: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  attackTypes: { type: [String], default: [] },
  obtained: { type: [String], default: [] },
});

const Weapon = mongoose.model("Weapon", WeaponSchema);

module.exports = Weapon;
