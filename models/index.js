const Pool = require('pg').Pool;

const config = {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PG_PORT
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

