// MOGOOSE/MODEL CONFIG
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created: { type: Date, default: Date.now },
  });
  
  const Blog = mongoose.model("Blog", blogSchema);

  module.exports = Blog;

  