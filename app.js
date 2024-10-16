// app.js
const express = require('express');
const app = express();
const connection = require('./config/db'); // Make sure the path is correct
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const packageRoutes = require('./routes/packageRoutes');
const adminRoutes=require("./routes/adminRoutes")

app.use(express.json()); // Parse JSON request bodies

// Integrate routes
app.use('/api/users', userRoutes); // Base route for user-related API
app.use('/api/bookings', bookingRoutes); // Base route for booking-related API
app.use('/api/packages', packageRoutes); // Base route for package-related API
app.use('/api/admin',adminRoutes)

// Directly set the port number here
const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
