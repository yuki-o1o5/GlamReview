const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  reviewId: Number,
  user: String,
  comment: String,
});

module.exports = mongoose.model("Comment", CommentSchema);
