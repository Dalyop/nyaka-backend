import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import Donation from '../../../models/Donation'; // Ensure this model is created

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      donationAmount,
      fundAllocation,
      paymentMethod,
      acknowledge,
    } = req.body;

    // Basic input validation
    if (!firstName || !lastName || !email || !phone || !donationAmount || !paymentMethod) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate donationAmount
    if (isNaN(donationAmount) || donationAmount <= 0) {
      return res.status(400).json({ error: 'Donation amount must be a positive number' });
    }

    try {
      const donation = new Donation({
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

      await donation.save();
      res.status(201).json({ message: 'Donation recorded!' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Failed to record donation' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}