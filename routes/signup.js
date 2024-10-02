// routes/signup.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust based on the actual file path

// Sign Up Route
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, selectedOption } = req.body;

  try {
    const newUser = new User({ firstName, lastName, email, phoneNumber, selectedOption });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' });
  }
});

module.exports = router