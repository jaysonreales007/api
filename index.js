const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/posts', require('./routes/posts'));
app.use('/api/v1/projects', require('./routes/projects'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/skills', require('./routes/skills'));
app.use('/api/v1/test', require('./routes/api'));

// Remove the app.listen part as Vercel will handle this
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the Express API
module.exports = app;
