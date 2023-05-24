const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productId: Number,
  user: String,
  review: String,
});

module.exports = mongoose.model("Review", ReviewSchema);
