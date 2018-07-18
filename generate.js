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
        dataItem.bookings.push(booking.checkIn, booking.duration);
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
      booking.save(function(err, booking) {
        if (err) {
          return console.error(err);
        }
      });
    }

    return this.data;
  }
}

const myFactory = new FakeDataGenerator();
myFactory.createData();
