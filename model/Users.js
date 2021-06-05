const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const coinsData = mongoose.Schema(
  {
    name: { type: String },
    symbol: { type: String },
    image: { type: String },
    usd: { type: Number, default: 0 },
    coin: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const userData = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  wallet: {
    type: Number,
    default: 1000,
  },

  coins: [coinsData],

  Date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: String,
  },
  comment: {
    type: String,
  },
});

userData.plugin(uniqueValidator);
module.exports = mongoose.model("Users", userData);
