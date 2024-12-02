// backend/api/index.js
const express = require('express');
const cors = require('cors');

// Initialize express
const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Routes
const chatRoutes = require("./routes/chat");

// Use routes
app.use("/chat", chatRoutes);

// Health check route
app.get("/", (req, res) => {
  console.log("API is running", process.env.CORS_ORIGIN);
  res.status(200).json({
    status: "success",
    message: "API is running",
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

// Add server startup for local development
if (require.main === module) {
	const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;