const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const User = require('../models/User'); // We need this to show who posted
const authMiddleware = require('../middleware/authMiddleware');

// --- GET ALL RESOURCES ---
// We protect this route with our new authMiddleware
router.get('/', authMiddleware, async (req, res) => {
  try {
    const resources = await Resource.findAll({
      // Include the 'User' model to show who uploaded it
      include: { model: User, attributes: ['username'] }
    });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- POST (UPLOAD) A NEW RESOURCE ---
router.post('/', authMiddleware, async (req, res) => {
  // We check the role from the token (which our middleware attached!)
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Forbidden: Only teachers can upload resources.' });
  }

  try {
    const { title, description, link } = req.body;

    const newResource = await Resource.create({
      title,
      description,
      link,
      UserId: req.user.id // This links the resource to the logged-in teacher
    });

    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;