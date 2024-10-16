// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { addBooking, getUserBookings } = require('../controller/bookingController'); // Assuming bookingController.js is in controllers folder
const { authenticateUser } = require('../middleware/authMiddleware'); // Assuming authMiddleware.js is in middleware folder

// Add a new booking route (protected)
router.post('/', authenticateUser, addBooking);

// Get bookings for the logged-in user route (protected)
router.get('/', authenticateUser, getUserBookings);

module.exports = router;
