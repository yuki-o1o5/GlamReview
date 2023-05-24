const Review = require("../model/reviewModel");

class ReviewController {
  async createReview(req, res) {
    const review = new Review(req.body);
    const result = await review.save();
    res.send(result);
  }
}

module.exports = ReviewController;
