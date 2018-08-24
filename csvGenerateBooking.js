const faker = require('faker');

class FakeDataGenerator {
  constructor() {
    this.data = [];
    this.totalString = '';
  }
  createData(x, y) {
    for (let i = x; i < y; i+= 1) {
      let dataItem = {};
      let dataString = '';

      dataItem.roomId = i;
      dataString += `${dataItem.roomId},`; 

      dataItem.roomName = 'room' + i;
      dataString += `${dataItem.roomName},`; 

      dataItem.price = faker.random.number({
        min: 50,
        max: 400
      });
      dataString += `${dataItem.price},`; 

      // dataItem.numberOfBookings = faker.random.number({
      //   min: 1,
      //   max: 45
      // });
      // dataString += `${dataItem.numberOfBookings}, `; 

      // dataItem.bookings = [];

      // for (let i = 0; i < dataItem.numberOfBookings; i++) {
      //   let booking = {};
      //   booking.checkIn = faker.date.between('2018-07-24', '2019-12-31');
      //   booking.duration = faker.random.number({
      //     min: 1,
      //     max: 31
      //   });

      //   dataItem.bookings.push(booking);
      // }
      // dataString += dataItem.bookings.join(', ');

      dataItem.serviceFee = faker.random.number({
        min: 15,
        max: 50
      });
      dataString += `${dataItem.serviceFee},`; 

      dataItem.cleaningFee = faker.random.number({
        min: 5,
        max: 35
      });
      dataString += `${dataItem.cleaningFee},`; 

      dataItem.minimumStay = faker.random.number({
        max: 3
      });
      dataString += `${dataItem.minimumStay},`; 

      dataItem.maxAdults = faker.random.number({
        min: 2,
        max: 8
      });
      dataString += `${dataItem.maxAdults},`; 

      dataItem.maxChildren = faker.random.number({
        min: 2,
        max: 8
      });
      dataString += `${dataItem.maxChildren},`; 

      dataItem.maxInfants = faker.random.number({
        min: 2,
        max: 4
      });
      dataString += `${dataItem.maxInfants},`; 

      dataItem.taxes = faker.random.number({
        min: 5,
        max: 40
      });
      dataString += `${dataItem.taxes},`; 

      let num1 = faker.random.number({
        max: 5
      });

      let num2 = faker.random.number({
        max: 10
      });

      const funFactTitles = [
        'This house is haunted.',
        'This place has a great view of the park.',
        'This place has amazing air conditioning.',
        'This is a very popular booking.',
        'People are talking about this place.',
        'This place is comfy cozy.'
      ];
      const funFacts = [
        'It’s been viewed 500+ times in the past week.',
        `It’s been booked ${dataItem.taxes} times in the past year.`,
        'The owner takes pictures of all the tenants.',
        'This is a top rated listing.',
        'The owner is a gentleman and a scholar.',
        'The owner is well-liked in his community.',
        'It is rated in the top 5% for hospitality.',
        'It is rated in the top 5% for cleanliness.',
        'There have been sloth sightings near this place.',
        'There have been alpaca sightings near this place.',
        'This place once belonged to Elon Musk.'
      ];

      dataItem.funFactTitles = funFactTitles[num1];
      dataString += `${dataItem.funFactTitles},`; 

      dataItem.funFacts = funFacts[num2];
      dataString += `${dataItem.funFacts}\n`; 

      // Shape of dataItem object
      //     {
      //       roomId: Number
      //       name: Unique Name
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
      //       funFactTitles: String
      //       funFacts: String
      //   }
      this.data.push(dataItem);
      console.log(dataString);
    }
  }
}

const boo = new FakeDataGenerator;

//node csvGenerateBooking.js > bookingData#.csv

//call it 
// boo.createData(1, 1000001);
// boo.createData(1000001, 2000001);
// boo.createData(2000001, 3000001);
// boo.createData(3000001, 4000001);
// boo.createData(4000001, 5000001);
// boo.createData(5000001, 6000001);
// boo.createData(6000001, 7000001);
// boo.createData(7000001, 8000001);
// boo.createData(8000001, 9000001);
// boo.createData(9000001, 10000001);
