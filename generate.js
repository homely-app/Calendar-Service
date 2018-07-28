import faker from 'faker';
import mongoose from 'mongoose';
import db from './models';

class FakeDataGenerator {
  constructor() {
    this.data = [];
  }

  createData() {
    for (let i = 0; i < 100; i += 1) {
      const dataItem = {};
      dataItem.roomId = i;

      dataItem.price = faker.random.number({
        min: 50,
        max: 400,
      });

      dataItem.numberOfBookings = faker.random.number({
        min: 1,
        max: 45,
      });

      dataItem.bookings = [];

      for (let j = 0; j < dataItem.numberOfBookings; j += 1) {
        const booking = {};
        booking.checkIn = faker.date.between('2018-07-24', '2019-12-31');
        booking.duration = faker.random.number({
          min: 1,
          max: 31,
        });

        dataItem.bookings.push(booking);
      }

      dataItem.serviceFee = faker.random.number({
        min: 15,
        max: 50,
      });

      dataItem.cleaningFee = faker.random.number({
        min: 5,
        max: 35,
      });

      dataItem.minimumStay = faker.random.number({
        max: 3,
      });

      dataItem.maxAdults = faker.random.number({
        min: 2,
        max: 8,
      });

      dataItem.maxChildren = faker.random.number({
        min: 2,
        max: 8,
      });

      dataItem.maxInfants = faker.random.number({
        min: 2,
        max: 4,
      });

      dataItem.taxes = faker.random.number({
        min: 5,
        max: 40,
      });

      const num1 = faker.random.number({
        max: 5,
      });

      const num2 = faker.random.number({
        max: 5,
      });

      const funFactTitles = [
        'This home is a former meth lab.',
        'This house is haunted.',
        'Someone died here last year.',
        "Don't book this place...please.",
        'This owner takes pictures of all tenants.',
      ];
      const funFacts = [
        'It’s been raided 50+ times in the past month.',
        'It’s been condemned twice in the past month.',
        'It’s been viewed 50,000+ times in the past week.',
        'It’s been desecrated 25+ times in the past month.',
        'It’s been defiled 100+ times in the past month.',
      ];

      dataItem.funFactTitles = funFactTitles[num1];
      dataItem.funFacts = funFacts[num2];

      // Shape of dataItem object
      //     {
      //       roomId: Number
      //       numberOfBookings: Number
      //       bookings:  Array [{checkIn: Date, duration: Number}]
      //       price: Number
      //       cleaningFee: Number
      //       serviceFee: Number
      //       minimumStay: Number
      //       maxAdults: Number,
      //       maxChildren: Number,
      //       maxInfants: Number,
      //       taxes: Number
      //   }

      const booking = new db.Booking(dataItem);
      const temp = booking.save();
      this.data.push(temp);
    }

    // close connection to db
    Promise.all(this.data).then(() => {
      mongoose.connection.close(() => {
        process.exit(0);
      });
    });

    return this.data;
  }
}

// flush db before seed
db.Booking.remove({}).exec((err) => {
  if (err) {
    // console.log(err);
  }
  const myFactory = new FakeDataGenerator();
  myFactory.createData();
});
