const mongoose = require("mongoose");
const { commentSchema } = require("./Comment");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  comments: { type: [commentSchema], default: [] },
});

module.exports = mongoose.model("Movie", movieSchema);
