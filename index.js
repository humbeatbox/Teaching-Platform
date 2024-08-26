const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/").auth;

// Connect to DB
mongoose
  .connect("mongodb://localhost:27017/courseDB")
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

// Route Middlewares
app.use("/api/user", authRoute);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
