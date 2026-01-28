const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Register Route ---
// This will be at POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    // Get data from the request body
    const { username, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user (password will be auto-hashed by the hook)
    const newUser = await User.create({
      username,
      password,
      role
    });

    res.status(201).json({ message: 'User created successfully!', userId: newUser.id });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Login Route ---
// This will be at POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find the user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Create a JWT Token
    // This token is the user's "proof" that they are logged in
    const token = jwt.sign(
      { id: user.id, role: user.role },
      'your-secret-jwt-key', // Use a strong secret in a real app (from .env)
      { expiresIn: '1h' } // Token lasts for 1 hour
    );

    res.status(200).json({
      message: 'Login successful!',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;