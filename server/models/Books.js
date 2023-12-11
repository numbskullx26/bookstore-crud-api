const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  thumbnail: {
    type: String,
    // required: true,
  },
  stars: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Book", BookSchema);
