const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/").auth;
const CourseRoute = require("./routes/").course;

const passport = require("passport");
require("./config/passport")(passport); //will call the function in passport.js

const cors = require("cors");

// Connect to DB
mongoose
  .connect("mongodb://localhost:27017/mernDB")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Failed to connect to DB");
    console.log(err);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route Middlewares
app.use("/api/user", authRoute);

//course route should be protected if not authenticated(without token)
app.use(
  "/api/courses",
  (req, res, next) => {
    console.log("course route is linking...");
    next();
  },
  passport.authenticate("jwt", { session: false }),
  CourseRoute
);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
