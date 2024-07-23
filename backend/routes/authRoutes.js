const express = require('express');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get current user
router.get('/current', protect, getCurrentUser);

// Preflight request for CORS
router.options('*', cors());

module.exports = router;
