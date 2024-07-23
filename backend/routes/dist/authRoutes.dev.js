"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    registerUser = _require.registerUser,
    loginUser = _require.loginUser,
    getCurrentUser = _require.getCurrentUser;

var _require2 = require('../middleware/authMiddleware'),
    protect = _require2.protect;

var router = express.Router(); // Register a new user

router.post('/register', registerUser); // Login a user

router.post('/login', loginUser); // Get current user

router.get('/current', protect, getCurrentUser);
module.exports = router;