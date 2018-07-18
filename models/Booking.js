const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Booking = new Schema({
  room_id: Number,
  numberOfBookings: Number,
  //   bookings: [{ checkIn: Date, duration: Number }],
  bookings: Array,
  price: Number,
  cleaningFee: Number,
  serviceFee: Number,
  minimumStay: Number
});

module.exports = Booking;
