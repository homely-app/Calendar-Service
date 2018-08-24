const Pool = require('pg').Pool;

const config = {
  host: 'ec2-52-91-195-117.compute-1.amazonaws.com',
  user: 'ec2-user',
  password: null,
  database: 'airfeccalendar',
  port: 5432
}

const pool = new Pool(config);

// const getRoomData = (params, callback) => {
//   const query = 'SELECT * FROM bookings WHERE bookings.roomId = $1';
//   pool.query(query, [params], (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       callback(data);
//     }
//   })
// }

module.exports = {
  pool: pool,
//  getRoomData
};

