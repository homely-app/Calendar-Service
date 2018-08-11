const faker = require('faker');

faker.seed(100);

// Tableshape
// id: Number
// roomId: Number
// bookingCheckIn: Date
// bookingDuration: Number

let count = 1;

const createDates = () => {
  for (let i = 1; i < 11; i += 1) {
    const bookingInstance = {};

    const numberOfBookings = faker.random.number({
      min: 1,
      max: 10
    });

    for (let j = 0; j < numberOfBookings; j += 1) {
      bookingInstance.id = count;
      bookingInstance.roomId = i;
      count += 1;
      bookingInstance.checkIn = faker.date.between('2018-07-24', '2019-12-31');
      
      bookingInstance.duration = faker.random.number({
        min: 1,
        max: 31
      });
    
    const bookingString = `${bookingInstance.id}, ${bookingInstance.roomId}, ${bookingInstance.checkIn}, ${bookingInstance.duration}`;
    //console.log(bookingInstance);
    console.log(bookingString);
    }
  }
}

createDates();
