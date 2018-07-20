var db = require('./models/');
const faker = require('faker');
const mongoose = require('mongoose');

class FakeDataGenerator {
  constructor() {
    this.data = [];
  }
  createData() {
    for (let i = 0; i < 100; i++) {
      let dataItem = {};
      dataItem.roomId = i;

      dataItem.price = faker.random.number({
        min: 50,
        max: 400
      });

      dataItem.numberOfBookings = faker.random.number({
        min: 1,
        max: 5
      });

      dataItem.bookings = [];

      // TODO - refine date generation algo to not produce overlapping bookings
      for (let i = 0; i < dataItem.numberOfBookings; i++) {
        let booking = {};
        booking.checkIn = faker.date.between('2018-07-30', '2019-12-31');
        booking.duration = faker.random.number({
          min: 1,
          max: 30
        });

        dataItem.bookings.push(booking);
      }

      dataItem.serviceFee = faker.random.number({
        min: 15,
        max: 50
      });

      dataItem.cleaningFee = faker.random.number({
        min: 5,
        max: 35
      });

      dataItem.minimumStay = faker.random.number({
        max: 3
      });

      // Add max adults, children, infants
      // Refactor bookings

      // Shape of dataItem object
      //     {
      //       room_id: Number
      //       numberOfBookings: Number
      //       bookings:  Array [{checkIn: Date, duration: Number}]
      //       price: Number
      //       cleaningFee: Number
      //       serviceFee: Number
      //       minimumStay: Number
      //   }

      // store in local array
      // this.data.push(dataItem);

      // add to db

      const booking = new db.Booking(dataItem);
      let temp = booking.save();
      this.data.push(temp);
    }

    // close connection to db
    Promise.all(this.data)
      .then(function(results) {
        console.log('sample item', results[0].bookings[0]);
        console.log(results.length + ' entrys saved in DataBase');
      })
      .catch(function(err) {
        console.error(err);
      })
      .then(function() {
        mongoose.connection.close(function() {
          process.exit(0);
        });
      });

    return this.data;
  }
}

// flush db before seed
db.Booking.remove({}).exec(function(err, results) {
  if (err) {
    console.log(err);
  }
  const myFactory = new FakeDataGenerator();
  myFactory.createData();
});
