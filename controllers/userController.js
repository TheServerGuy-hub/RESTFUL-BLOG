const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  getForm: async (req, res) => {
    res.render("loginPage");
  },

  createUser: async (req, res) => {
    const person = new User.userModel();
    const { fullname, username, password } = req.body;

    person.fullname = fullname;
    person.username = username;
    const suppliedPassword = password;

    // hash password
    try {
      person.password = await bcrypt.hash(suppliedPassword, 10);
    } catch (error) {
      console.log("error", error);
    }

    // save new user to DB
    person.save((err, savedObject) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(savedObject);
      }
    });
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const findUser = await User.userModel.findOne({ username });
      const isMatch = await bcrypt.compare(password, findUser.password);

      if (!findUser || !isMatch) {
        return res.json({
          login: "false",
          message: "invalid username or password",
        });
      } else {
        const token = jwt.sign(
          { _id: findUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.header("auth-token", token).json({ token: token, user: findUser });
        res.json({
          login: true,
          message: "success",
        });
      }
    } catch (error) {
      return res.json({
        login: false,
        message: "sorry cant log you in at this time",
      });
    }
  },
};
