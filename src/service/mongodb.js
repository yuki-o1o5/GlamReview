require("dotenv").config();
const mongoose = require("mongoose");

const UserController = require("../controller/userController");
const ReviewController = require("../controller/reviewController");
const CommentController = require("../controller/commentController");

const URL = process.env.MONGO_URL;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

const userController = new UserController();
const reviewController = new ReviewController();
const commentController = new CommentController();

module.exports = { userController, reviewController, commentController };
