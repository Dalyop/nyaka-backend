const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnect = require('./lib/mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection using your custom logic
dbConnect()
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after the connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1); // Exit process if connection fails
  });

// Routes
app.use('/api/signup', require('./routes/signup'));
app.use('/api/donate', require('./routes/donate'));