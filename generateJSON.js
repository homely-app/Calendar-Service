const faker = require('faker');

class FakeDataGenerator {
  constructor() {
    this.data = [];
  }
  createData() {
    for (let i = 9000000; i < 10000001; i++) {
      let dataItem = {};
      dataItem.roomId = i;

      dataItem.roomName = 'room' + i;

      dataItem.price = faker.random.number({
        min: 50,
        max: 400
      });

      dataItem.numberOfBookings = faker.random.number({
        min: 1,
        max: 10
      });

      dataItem.bookings = [];

      for (let i = 0; i < dataItem.numberOfBookings; i++) {
        let booking = {};
        booking.checkIn = faker.date.between('2018-07-24', '2019-12-31');
        booking.duration = faker.random.number({
          min: 1,
          max: 31
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

      dataItem.maxAdults = faker.random.number({
        min: 2,
        max: 8
      });

      dataItem.maxChildren = faker.random.number({
        min: 2,
        max: 8
      });

      dataItem.maxInfants = faker.random.number({
        min: 2,
        max: 4
      });

      dataItem.taxes = faker.random.number({
        min: 5,
        max: 40
      });

      let num1 = faker.random.number({
        max: 5
      });

      let num2 = faker.random.number({
        max: 7
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
        'There have been sloth sightings near this place.',
        'There have been alpaca sightings near this place.'
      ];

      dataItem.funFactTitles = funFactTitles[num1];
      dataItem.funFacts = funFacts[num2];

      this.data.push(dataItem);
      //console.log(`${dataItem.roomId}, ${dataItem.roomName}, ${dataItem.price}, ${dataItem.bookings}, ${dataItem.serviceFee}, ${dataItem.cleaningFee}, ${dataItem.minimumStay}, ${dataItem.maxAdults}, ${dataItem.maxChildren}, ${dataItem.maxInfants}, ${dataItem.taxes}, ${dataItem.funFactTitles}, ${dataItem.funFacts}`);
    }
    console.log(JSON.stringify(this.data));
  }
}

const boo = new FakeDataGenerator;

boo.createData();
