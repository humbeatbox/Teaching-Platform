const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 50,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["student", "instructor"],
    default: "student",
  },
  Date: { type: Date, default: Date.now },
});

// instance methods
userSchema.methods.isStudent = function () {
  console.log("isStudent");
  return this.role == "student";
};

userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

//for mongoose handle password hashing
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const hashValue = await bcrypt.hash(this.password, 16);
    this.password = hashValue;
  }
  next();
});

// static methods for checking user password
userSchema.methods.comparePassword = async function (password, callBack) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return callBack(null, result);
  } catch (e) {
    return callBack(e, result);
  }
};

module.exports = mongoose.model("User", userSchema);
