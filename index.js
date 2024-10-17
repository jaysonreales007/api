const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Add Helmet middleware
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit JSON body size

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Custom landing page route
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(err.status).end();
    }
  });
});

// Custom landing page route for /api and /api/v1
app.get(['/api', '/api/v1'], (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'not-found.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(err.status).end();
    }
  });
});

// Catch-all route for API endpoints
app.use('/api/v1', (req, res, next) => {
  next();
});

// Routes
app.use('/api/v1/posts', require('./routes/posts'));
app.use('/api/v1/projects', require('./routes/projects'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/skills', require('./routes/skills'));
app.use('/api/v1/test', require('./routes/api'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Catch-all route for unhandled requests
app.use('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'not-found.html'));
});

// Remove the app.listen part as Vercel will handle this
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the Express API
module.exports = app;
