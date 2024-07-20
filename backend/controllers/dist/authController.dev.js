"use strict";

// backend/controllers/authController.js
var User = require('../models/User');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

exports.registerUser = function _callee(req, res) {
  var _req$body, username, email, password, userExists, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          userExists = _context.sent;

          if (!userExists) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'User already exists'
          }));

        case 7:
          user = new User({
            username: username,
            email: email,
            password: password
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.status(201).json({
            message: 'User registered successfully'
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            message: 'Server error',
            error: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

exports.loginUser = function _callee2(req, res) {
  var _req$body2, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Incorrect email or password'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Incorrect email or password'
          }));

        case 12:
          token = jwt.sign({
            id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.json({
            message: 'Successfully logged in',
            token: token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email
            }
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          console.error('Login error:', _context2.t0);
          res.status(500).json({
            message: 'Server error',
            error: _context2.t0.message
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

exports.getCurrentUser = function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context3.sent;
          res.json(user);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Get current user error:', _context3.t0);
          res.status(500).json({
            message: 'Server error',
            error: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};