const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  roomId: Number,
  numberOfBookings: Number,
  bookings: [{ checkIn: Date, duration: Number }],
  price: Number,
  cleaningFee: Number,
  serviceFee: Number,
  minimumStay: Number,
  maxAdults: Number,
  maxChildren: Number,
  maxInfants: Number,
  taxes: Number,
  funFactTitles: String,
  funFacts: String
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
