const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productId: String,
  user: String,
  title: String,
  review: String,
  score: Number,
  date: String,
});

module.exports = mongoose.model("Review", ReviewSchema);
