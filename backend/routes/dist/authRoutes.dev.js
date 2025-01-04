"use strict";

var express = require('express');

var cors = require('cors');

var _require = require('../controllers/authController'),
    registerUser = _require.registerUser,
    loginUser = _require.loginUser,
    getCurrentUser = _require.getCurrentUser;

var _require2 = require('../middleware/authMiddleware'),
    protect = _require2.protect;

var router = express.Router(); // Preflight request

router.options('*', cors()); //change
// Register a new user

router.post('/register', registerUser); // Login a user

router.post('/login', loginUser); // Get current user

router.get('/current', protect, getCurrentUser);
module.exports = router;