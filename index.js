const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connect to DB
mongoose
  .connect("mongodb://localhost:27017/courseDB")
  .then(() => {
    console.log("Connected to courseDBB");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
