const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("get the request related to auth");
  next();
});

//for testing
router.get("/testAPI", (req, res) => {
  return res.send("connect to auth route...");
});

//register
router.post("/register", async (req, res) => {
  //validate the data before we make a user
  console.log("registering user...");
  //   console.log(req.body);
  //   console.log(registerValidation(req.body));
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //check the email is already in the database or not
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("this email already exists");

  //create a new user
  let { email, username, password, role } = req.body;
  let newUser = new User({ email, username, password, role });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "Successfully registered",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("Failed to register user");
  }
});

router.post("/login", async (req, res) => {
  //validate the data before we make a user
  console.log("logging in user...");
  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //check the email is already in the database or not(find User exists or not)
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) return res.status(400).send("Can not find the User");

  //use comparePassword method in user model
  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);
    console.log("compare password");
    if (isMatch) {
      // create json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "successfully logged in",
        token: "JWT " + token, //need the space before JWT
        user: foundUser,
      });
    } else {
      //   return res.status(401).send("Invalid password");
      console.log("compare password failed");
      return res.status(401).send("Please check your email and password!");
    }
  });
});

module.exports = router;
