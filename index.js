const express = require("express");

const {
  userController,
  reviewController,
  commentController,
} = require("./src/service/mongodb");

const app = express();
app.use(express.json());

app.post("/users", (req, res) => userController.createUser(req, res));
app.post("/reviews", (req, res) => reviewController.createReview(req, res));
app.post("/comments", (req, res) => commentController.createComment(req, res));

app.listen(8000, () => console.log("Server started on port 8000"));

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.get("/api/health", (req, res) => res.json({ msg: "Healthy!" }));

// app.post("/api/user", (req, res) =>
//   res.json({
//     user: {
//       name: "hello",
//       mail: "jkksst1712@gmail.com",
//     },
//   })
// );
