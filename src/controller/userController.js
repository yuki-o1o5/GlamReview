const User = require("../model/userModel");

class UserController {
  async createUser(req, res) {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
  }
}

module.exports = UserController;
