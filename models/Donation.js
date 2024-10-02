const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  organization: { type: String },
  donationAmount: { type: Number },
  fundAllocation: { type: String },
  paymentMethod: { type: String },
  acknowledge: { type: String },
  // Add any other fields as necessary
});

// Use CommonJS export
module.exports = mongoose.models.Donation || mongoose.model('Donation', donationSchema);