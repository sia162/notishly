const { response } = require("express");
const express = require("express");
const router = express.Router();

// importing User Model Schema
const User = require("../models/User");

// validation of data and password security
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// jwt authentication
var jwt = require("jsonwebtoken");
const JWT_SECRET = "siyaisagood$girl";

// user fetch to get data
const fetchuser = require("../middleware/fetchuser");

//ROUTE 1: create a user using: POST "/api/auth/createuser" no login required
router.post(
  "/createuser",
  [
    //here list the validation things
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // if error in validation of above restriction then return this
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if user with same email exist already in User schema
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({
          success,
          error: "sorry a user with this email already exist!",
        });
      }

      // adding salt to password and hashing it
      const salt = await bcrypt.genSalt(10);
      securePass = await bcrypt.hash(req.body.password, salt);

      // creating new user in User Schema here which gets added in the database inotebook
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });

      // jwt authentication
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //return a token

      success = true;
      res.json({ success, authtoken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

//ROUTE 2: authenticating an user login: POST /api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        const success = false;
        return res
          .status(400)
          .json({ success, error: "Try to login with correct credentials!" });
      }

      // checking password internally matches the hash and return true or false
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        const success = false;
        return res
          .status(400)
          .json({ success, error: "Try to login with correct credentials!" });
      }

      // auth token has id inside it
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //return a token
      const success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

//ROUTE 3: Get logged in user details: POST /api/auth/getuser. login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id; //fetched from fetchuser with the help of auth token
    const user = await User.findById(userId).select("-password"); //selected all fields except the password
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
