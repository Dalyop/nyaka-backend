// pages/api/donate.js
import dbConnect from '../../../lib/mongodb';
import Donation from '../../../models/Donation'; // Create this model

const DonationSchema = new mongoose.Schema({
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

const Donation = mongoose.models.Donation || mongoose.model('Donation', DonationSchema);

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
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
