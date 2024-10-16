const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

  // Get all projects
  router.get('/', async (req, res) => {
      try {
      const projects = await Project.find();
      /* console.log('Projects retrieved:', projects); */
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;