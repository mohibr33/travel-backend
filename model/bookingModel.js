const connection = require("../config/db");

class Booking {
  constructor(userid, packageid, travelstatus, paymentstatus) { // Changed to match the database column name
    this.userid = userid;
    this.packageid = packageid;
    this.travelstatus = travelstatus;
    this.paymentstatus = paymentstatus; // Changed to match the database column name
  }

  check() {
    if (!this.packageid) {
      throw new Error("Package ID is required");
    }
    if (!this.travelstatus) {
      throw new Error("Travel status is required");
    }
    if (!this.paymentstatus) { // Changed to match the database column name
      throw new Error("Payment status is required");
    }
  }
}

const addBooking = (bookingData, callback) => {
  const booking = new Booking(
    bookingData.userid,
    bookingData.packageid,
    bookingData.travelstatus,
    bookingData.paymentstatus // Changed to match the database column name
  );

  // Validate the booking data
  try {
    booking.check();
  } catch (error) {
    return callback(error, null);
  }

  // Prepare the SQL query to insert the booking
  const query = `INSERT INTO booking (userid, packageid, travelstatus, paymentstatus) VALUES (?, ?, ?, ?)`; // Changed to match the database column name
  connection.query(
    query,
    [booking.userid, booking.packageid, booking.travelstatus, booking.paymentstatus], // Changed to match the database column name
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// Function to get all bookings for a specific user
const getUserBookings = (userid, callback) => {
  const query = `SELECT * FROM booking WHERE userid = ?`; // Ensure 'userid' matches your database
  connection.query(query, [userid], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  addBooking,
  getUserBookings,
};
