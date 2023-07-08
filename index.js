const express = require("express");
const path = require("path");

const { userController, reviewController } = require("./src/service/mongodb");

const app = express();

app.listen(8000, () => console.log("Server started on port 8000"));

app.use(express.static(path.join(__dirname, "client", "dist")));

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
