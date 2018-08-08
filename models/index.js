require('dotenv').config();
const mongoose = require('mongoose');

// TODO: Implement .env variables
const IP = 'database:27017';
const dbURI = process.env.MONGODB_URI || `mongodb://${IP}/bookings`;

mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true
  }
);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

module.exports = { Booking: require('./Booking') };
