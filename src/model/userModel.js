const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Users", UsersSchema);
