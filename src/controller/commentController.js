const Comment = require("../model/commentModel");

class CommentController {
  async createComment(req, res) {
    const comment = new Comment(req.body);
    const result = await comment.save();
    res.send(result);
  }
}

module.exports = CommentController;
