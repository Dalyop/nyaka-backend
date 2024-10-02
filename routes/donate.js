const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); // Ensure this model is created

// Donation Route
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone, organization, donationAmount, fundAllocation, paymentMethod, acknowledge } = req.body;

  // Basic input validation
  if (!firstName || !lastName || !email || !phone || !donationAmount || !paymentMethod) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate donationAmount
  if (isNaN(donationAmount) || donationAmount <= 0) {
    return res.status(400).json({ error: 'Donation amount must be a positive number' });
  }

  try {
    const newDonation = new Donation({
      firstName,
      lastName,
      email,
      phone,
      organization,
      donationAmount,
      fundAllocation,
      paymentMethod,
      acknowledge,
    });
    
    await newDonation.save();
    res.status(201).json({ message: 'Donation received successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Donation submission failed' });
  }
});

module.exports = router;