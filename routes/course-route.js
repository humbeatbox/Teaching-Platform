const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("course route is connected...");
  next();
});

//create a new course
router.post("/", async (req, res) => {
  // validate the data before we make a course
  let { error } = courseValidation(req.body);
  console.log("course validation");
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is a student
  if (req.user.isStudent()) {
    return res.status(400).send("Only instructors can create new courses.");
  }

  let { title, description, price } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send("Course created successfully");
  } catch (e) {
    // return res status(500 ).send(e); // for debugging
    return res.status(500).send("Failed to create a new course");
  }
});

module.exports = router;
