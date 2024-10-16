// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controller/authController'); // Assuming authController.js is in controllers folder

// User signup route
router.post('/signup', signup);

// User login route
router.post('/login', login);

module.exports = router;
