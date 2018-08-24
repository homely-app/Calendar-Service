const faker = require('faker');

faker.seed(100);

// Tableshape
// id: Number
// roomId: Number
// bookingCheckIn: Date
// bookingDuration: Number

let count = 49529080; //44025849; //38522618; //33019387; //27516156; //22012925; //16509694// 11006463; //5503232; //49529080; //44025849; //38522618; //33019387; //27516156; //22012925; //16509694; //11006463; 

const createDates = (start, end) => {
  for (let i = start; i < end; i += 1) {
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

      checkInString = JSON.stringify(bookingInstance.checkIn);

      bookingInstance.duration = faker.random.number({
        min: 1,
        max: 31
      });

    const bookingString = `${bookingInstance.id},${bookingInstance.roomId},${checkInString},${bookingInstance.duration}`;

    console.log(bookingString);

    }
  }
}

// createDates(1,1000001);
// createDates(1000001, 2000001);
// createDates(2000001, 3000001);
// createDates(3000001, 4000001);
// createDates(4000001, 5000001);
// createDates(5000001, 6000001);
// createDates(6000001, 7000001);
// createDates(7000001, 8000001);
// createDates(8000001, 9000001);
// createDates(9000001, 10000001);
