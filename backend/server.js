// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const co2Routes = require('./routes/co2Routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/co2', co2Routes);

// Routes
app.get('/', (req, res) => {
  res.send('Hello, MERN Stack!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
