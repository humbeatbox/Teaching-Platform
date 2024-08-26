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
    enum: ["student", "teacher"],
    default: "student",
  },
  Date: { type: Date, default: Date.now },
});

// instance methods
userSchema.methods.isSealer = function () {
  return this.role == "teacher";
};

userSchema.methods.isCustomer = function () {
  return this.role == "student";
};

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
