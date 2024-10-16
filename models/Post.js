const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  comments: Number,
  reposts: Number,
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema, 'posts');