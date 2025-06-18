const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Alert = require('../models/Alert');
const verifyToken = require('../middelware/authMiddleware');

// Subscribe or update preferences
router.post('/subscribe', verifyToken, async (req, res) => {
  try {
    const { email, preferences, frequency } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOneAndUpdate(
      { email },
      { preferences, frequency },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get latest alerts with optional filters
router.get('/latest', async (req, res) => {
  try {
    const filter = {};

    // Optional query params: ?category=weather
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const alerts = await Alert.find(filter)
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'email');

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
