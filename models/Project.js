const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  size: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema, 'projects');