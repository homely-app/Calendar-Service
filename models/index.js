const Pool = require('pg').Pool;

const config = {
  host: 'localhost',
  user: 'Chao',
  password: '',
  database: 'calendar',
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

