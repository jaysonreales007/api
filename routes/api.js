const express = require('express');
const router = express.Router();

// Define your API routes here
router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

module.exports = router;