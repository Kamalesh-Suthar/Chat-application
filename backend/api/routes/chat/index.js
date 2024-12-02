// backend/api/routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Konichiwa' });
});

module.exports = router;