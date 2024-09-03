const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes").auth;
const CourseRoute = require("./routes").course;

const passport = require("passport");
require("./config/passport")(passport); //will call the function in passport.js

const cors = require("cors");

// Connect to DB
mongoose
  .connect(process.env.MONGODB_CONNECTION)
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

//for use the config in react(set the environment variable)
app.get("/api/config", (req, res) => {
  res.json({ apiUrl: process.env.API_URL });
});
// Serve static assets for react in production
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
