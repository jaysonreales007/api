const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add a new category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    tools: req.body.tools
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding new category:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
