"use strict";

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cors = require('cors');

require('dotenv').config();

var app = express(); // Middleware

app.use(bodyParser.json());
app.use(cors()); // MongoDB Connection

mongoose.connect(process.env.MONGO_URI).then(function () {
  return console.log('MongoDB connected');
})["catch"](function (err) {
  return console.error('MongoDB connection error:', err);
}); // Import routes

var authRoutes = require('./routes/authRoutes');

var co2Routes = require('./routes/co2Routes'); // Use routes


app.use('/api/auth', authRoutes);
app.use('/api/co2', co2Routes); // Routes

app.get('/', function (req, res) {
  res.send('Hello, MERN Stack!');
}); // Start the server

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});