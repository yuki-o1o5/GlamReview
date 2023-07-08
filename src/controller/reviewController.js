const Review = require("../model/reviewModel");

class ReviewController {
  async createReview(req, res) {
    try {
      const { userId, productId, ...rest } = req.body;
      const existingReview = await Review.findOne({ userId, productId });
      if (existingReview) {
        res.status(400).send({ message: "User already reviewed this product" });
        return;
      }
      const review = new Review({ userId, productId, ...rest });
      const result = await review.save();
      res.send(result);
    } catch {
      res.status(500).send({ error: error.message });
    }
  }

  async getReviewsByProduct(req, res) {
    try {
      const { productId } = req.params;
      const reviews = await Review.find({ productId: productId });
      if (reviews) {
        res.json(reviews);
      } else {
        res.status(404).send({ error: "No reviews found for this product" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async updateReview(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (review) {
        res.json(review);
      } else {
        res.status(404).send({ error: "Review not found" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByIdAndRemove(id);
      if (review) {
        res.json({ message: "Review deleted successfully" });
      } else {
        res.status(404).send({ error: "Review not found" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = ReviewController;
