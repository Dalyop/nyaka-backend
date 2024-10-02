// models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  organization: { type: String },
  donationAmount: { type: Number, required: true },
  fundAllocation: { type: String },
  paymentMethod: { type: String },
  acknowledge: { type: String },
});

module.exports = mongoose.model('Donation', DonationSchema);
