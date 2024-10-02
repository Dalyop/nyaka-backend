const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Sign Up Route
router.post('/users', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  // Basic input validation
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword, // Store the hashed password
    });
    
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'User creation failed' });
  }
});

module.exports = router;