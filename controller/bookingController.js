// controllers/bookingController.js
const bookingModel = require("../model/bookingModel");

// Controller for adding a new booking
const addBooking = (req, res) => {
  const { packageid, travelstatus, paymentstatus } = req.body;
  const userid = req.user.id; // Assuming user info is available in req.user

  const bookingData = {
    userid: userid,
    packageid: packageid,
    travelstatus: travelstatus,
    paymentstatus: paymentstatus,
  };

  bookingModel.addBooking(bookingData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(201).json({
        message: "Booking has been added successfully",
        bookingId: result.insertId,
      });
    }
  });
};

// Controller for retrieving bookings of the logged-in user
const getUserBookings = (req, res) => {
  const userid = req.user.id; // Assuming user info is available in req.user

  bookingModel.getUserBookings(userid, (err, bookings) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(bookings);
  });
};

module.exports = {
  addBooking,
  getUserBookings,
};
