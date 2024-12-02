// backend/api/index.js
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const app = express();
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api', (req, res) => {
  res.json({ status: 'API is running' });
});

// Export handler for serverless function
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const server = createServer(app);
  socketHandler(server);
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}