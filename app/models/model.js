const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');

const blockmolderSchema = new mongoose.Schema({
  fullName: String,
  phone: Number,
  country: String,
  email: String,
  password: String,
  terms: String,
});

const Blockmolder = mongoose.model("Blockmolder", blockmolderSchema);

module.exports = Blockmolder
