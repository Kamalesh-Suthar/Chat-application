// backend/api/index.js
const express = require('express');
const cors = require('cors');
const db = require("../models/db");

// Initialize express
const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Routes
// const chatRoutes = require("./routes/chat");
const User = require("../models/User");

// Use routes
// app.use("/chat", chatRoutes);

// Health check route
app.get("/", async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
  });
});

app.post("/register/google", async (req, res) => {
  try {
    const { newUserData } = req.body;
    const providerData = newUserData.providerData[0];
    const user = await User.findOne({ email: providerData.email }).exec();
    if (user) {
      res.status(200).json(user);
      return;
    }

    const newUser = new User({
      providerId: providerData.providerId,
      displayName: providerData.displayName,
      email: providerData.email,
      phoneNumber: providerData.phoneNumber,
      photoURL: providerData.photoURL,
      uid: providerData.uid,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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