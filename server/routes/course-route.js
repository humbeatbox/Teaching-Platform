const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;
const mongoose = require("mongoose");

router.use((req, res, next) => {
  console.log("course route is connected...");
  next();
});

//Bellow is REASTful API

//validate the course id
const validateObjectId = (req, res, next) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Invalid course ID");
  }
  next();
};
//find course by id
const findCourseById = async (req, res, next) => {
  const { _id } = req.params;
  try {
    let courseFound = await Course.findById(_id);
    if (!courseFound) {
      return res.status(404).send("Can not find the course");
    }
    req.course = courseFound;
    next();
  } catch (e) {
    next(e);
  }
};
// get all courses
router.get("/", async (req, res) => {
  try {
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    // return res.status(5000).send(e);
    next(e);
  }
});

// use course id to get course
router.get("/:_id", validateObjectId, findCourseById, async (req, res) => {
  let { _id } = req.params;
  // check if the course id is valid
  try {
    let courseFound = await Course.findById(_id)
      .populate("instructor", ["email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    next(e);
  }
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
    let existingCourse = await Course.findOne({ title });
    // check if the course already exists by title
    if (existingCourse) {
      return res.status(400).send("Course with the same title already exists.");
    }
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send("Course created successfully");
  } catch (e) {
    res.status(201).send({
      message: "Course created successfully",
      course: savedCourse,
    });
  }
});

// patch a course by id (change course content)
router.patch("/:_id", validateObjectId, findCourseById, async (req, res) => {
  // check new course content is valid
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (req.course.instructor.equals(req.user._id)) {
    let updatedCourse = await Course.findByIdAndUpdate(
      req.course._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).send({
      message: "Course updated successfully",
      updatedCourse,
    });
  } else {
    return res
      .status(403)
      .send("Only the instructor of this course can update the course");
  }
});

// update a course by id (replace course content)
router.put("/:_id", validateObjectId, findCourseById, async (req, res) => {
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.course.instructor.equals(req.user._id)) {
    let updatedCourse = await Course.findByIdAndUpdate(
      req.course._id,
      req.body,
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );
    return res.status(200).send({
      message: "Course updated successfully",
      updatedCourse,
    });
  } else {
    return res
      .status(403)
      .send("Only the instructor of this course can update the course");
  }
});
// delete a course by id
router.delete("/:_id", validateObjectId, findCourseById, async (req, res) => {
  if (req.course.instructor.equals(req.user._id)) {
    await Course.deleteOne({ _id: req.course._id }).exec();
    return res.status(200).send("Course deleted successfully");
  } else {
    return res
      .status(403)
      .send("Only the instructor of this course can delete the course");
  }
});

//error handling
router.use((err, req, res, next) => {
  //   console.error(err.stack);
  console.error(`Error occurred in ${req.method} ${req.url} - ${err.stack}`);
  res.status(500).send("Something Wrong!");
});

module.exports = router;
