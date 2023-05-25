const express = require("express");

const {
  userController,
  reviewController,
  commentController,
} = require("./src/service/mongodb");

const app = express();
app.use(express.json());

app.listen(8000, () => console.log("Server started on port 8000"));

app.post("/api/users/signup", (req, res) =>
  userController.createUser(req, res)
);
app.post("/api/users/login", (req, res) => userController.loginUser(req, res));

app.get("/api/secure-endpoint", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    // handle your request here...
  });
});

// app.post("/api/reviews", (req, res) => reviewController.createReview(req, res));
// app.get("/api/reviews/:id", (req, res) => reviewController.getReview(req, res));
// app.put("/api/reviews/:id", (req, res) =>
//   reviewController.updateReview(req, res)
// );
// app.delete("/api/reviews/:id", (req, res) =>
//   reviewController.deleteReview(req, res)
// );
