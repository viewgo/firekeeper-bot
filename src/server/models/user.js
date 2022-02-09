const mongoose = require("mongoose");
const moment = require("moment");
const { ObjectId } = require("mongodb");
const Weapon = require("./weapon");

const AttributesSchema = new mongoose.Schema({
  vigor: { type: Number, default: 1 },
  attunement: { type: Number, default: 1 },
  endurance: { type: Number, default: 1 },
  vitality: { type: Number, default: 1 },
  strength: { type: Number, default: 1 },
  dexterity: { type: Number, default: 1 },
  intelligence: { type: Number, default: 1 },
  faith: { type: Number, default: 1 },
  luck: { type: Number, default: 1 },
});

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: {
    type: String,
    required: true,
  },
  level: { type: Number, default: 1 },
  souls: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  spiritsDestroyed: { type: Number, default: 0 },
  hostsDestroyed: { type: Number, default: 0 },
  lastInvaded: { type: Date, default: moment.now() },
  attributes: {
    vigor: { type: Number, default: 1 },
    attunement: { type: Number, default: 1 },
    endurance: { type: Number, default: 1 },
    vitality: { type: Number, default: 1 },
    strength: { type: Number, default: 1 },
    dexterity: { type: Number, default: 1 },
    intelligence: { type: Number, default: 1 },
    faith: { type: Number, default: 1 },
    luck: { type: Number, default: 1 },
  },
  equipped: {
    left1: {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: "Weapon",
      default: null,
    },
    left2: {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: "Weapon",
      default: null,
    },
    right1: {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: "Weapon",
      default: null,
    },
    right2: {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: "Weapon",
      default: null,
    },
    spells: [],
  },
  knownSpells: { type: [mongoose.Schema.Types.ObjectId] },
  inventory: {
    type: [
      {
        item: { type: mongoose.Schema.Types.ObjectId },
        quantity: { type: Number },
      },
    ],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
