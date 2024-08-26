const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const User = require("../models").user;

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

module.exports = router;
