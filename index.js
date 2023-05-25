const express = require("express");

const { userController, reviewController } = require("./src/service/mongodb");

const app = express();
app.use(express.json());

app.listen(8000, () => console.log("Server started on port 8000"));

// ========================================
// About user
// ========================================
app.post("/api/users/signup", (req, res) =>
  userController.createUser(req, res)
);
app.post("/api/users/login", (req, res) => userController.loginUser(req, res));

// ========================================
// About review
// ========================================
app.post("/api/reviews", (req, res) => reviewController.createReview(req, res));
app.get("/api/reviews/:productId", (req, res) =>
  reviewController.getReviewsByProduct(req, res)
);
app.put("/api/reviews/:id", (req, res) =>
  reviewController.updateReview(req, res)
);
app.delete("/api/reviews/:id", (req, res) =>
  reviewController.deleteReview(req, res)
);
