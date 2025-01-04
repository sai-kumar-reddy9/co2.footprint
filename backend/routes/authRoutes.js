const express = require('express');
const cors = require('cors'); 
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Preflight request
router.options('*', cors()); //change

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get current user
router.get('/current', protect, getCurrentUser);

module.exports = router;
