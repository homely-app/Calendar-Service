const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  roomId: Number,
  numberOfBookings: Number,
  //   bookings: [{ checkIn: Date, duration: Number }],
  bookings: Array,
  price: Number,
  cleaningFee: Number,
  serviceFee: Number,
  minimumStay: Number
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
