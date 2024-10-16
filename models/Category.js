const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
  tool: String,
  icon: String
});

const CategorySchema = new mongoose.Schema({
  name: String,
  tools: [ToolSchema]
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema, 'categories');
