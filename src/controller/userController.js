const bcrypt = require("bcrypt");
const User = require("../model/userModel");

class UserController {
  async createUser(req, res) {
    try {
      const { password, ...rest } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds, adjust as necessary
      const user = new User({ ...rest, password: hashedPassword });
      const result = await user.save();
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({ message: "Invalid email or password" });
      }
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).send({ message: "Invalid password" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = UserController;
