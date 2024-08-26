const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sealer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  students: {
    // array of student ids
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);
