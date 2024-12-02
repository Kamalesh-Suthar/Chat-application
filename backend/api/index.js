// backend/api/index.js
const express = require('express');
const cors = require('cors');

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running'
  });
});

// Example route
app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello from the API!'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Export for Vercel
module.exports = app;