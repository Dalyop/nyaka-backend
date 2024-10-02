// routes/donate.js
const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); // Create this model

// Donation Route
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone, organization, donationAmount, fundAllocation, paymentMethod, acknowledge } = req.body;

  try {
    const newDonation = new Donation({ firstName, lastName, email, phone, organization, donationAmount, fundAllocation, paymentMethod, acknowledge });
    await newDonation.save();
    res.status(201).json({ message: 'Donation received successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Donation submission failed' });
  }
});

module.exports = router;
