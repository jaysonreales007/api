const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add a new skill
router.post('/', async (req, res) => {
  const skill = new Skill({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color
  });

  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Error adding new skill:', error);
    res.status(400).json({ message: error.message });
  }
});

// Add multiple skills
router.post('/bulk', async (req, res) => {
  try {
    const skills = req.body;
    const insertedSkills = await Skill.insertMany(skills);
    res.status(201).json(insertedSkills);
  } catch (error) {
    console.error('Error adding skills in bulk:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
