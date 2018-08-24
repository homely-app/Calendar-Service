const db = require('../models');
const cache = require('../server/redis.js')

module.exports = {
  getRoom: (req, res) => {
    cache.get(req.params.id, (err, result) => {
      if (result) {
        const parsedResult = JSON.parse(result);
        res.send(parsedResult);
      } else {
        const query = `SELECT * FROM bookingDates INNER JOIN bookings ON bookings.roomId = bookingDates.roomId WHERE bookingDates.roomId = ${req.params.id}`;
        db.pool.query(query, (err, data) => {
          if (err) {
            throw err;
          } else {
            //sep bookings and return as array 'bookings': []
            let idealData = {};

            idealData.roomId = data.rows[0].roomId;
            idealData.roomName = data.rows[0].roomName;
            idealData.price = data.rows[0].price;
            idealData.cleaningFee = data.rows[0].cleaningFee;
            idealData.serviceFee = data.rows[0].serviceFee;
            idealData.minimumStay = data.rows[0].minimumStay;
            idealData.maxAdults = data.rows[0].maxAdults;
            idealData.maxChildren = data.rows[0].maxChildren;
            idealData.maxInfants = data.rows[0].maxInfants;
            idealData.taxes = data.rows[0].taxes;
            idealData.funFactTitles = data.rows[0].funFactTitles;
            idealData.funFacts = data.rows[0].funFacts;
            idealData.bookings = [];

            for (let i = 0; i < data.rows.length; i += 1) {
              let booking = {};
              booking.checkIn = data.rows[i].bookingCheckIn;
              booking.duration = data.rows[i].bookingDuration;
              idealData.bookings.push(booking);
            }

            res.json(idealData);
            cache.setex(req.params.id, 3600000, JSON.stringify(idealData));
          }
        })
      }
    })
  },

  getBookingDateInfo: (req, res, next) => {
    const roomId = req.params.id;
    db.pool.connect('SELECT * FROM bookingDates WHERE roomId = $1', roomId)
      .exec()
      .then(data => {
        if (!data || !data.length) {
          next();
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {next(err)});
  },

  // putRoom: (req, res, next) => {
  //   const roomId = req.params.id;
  //   db.pool.connect('UPDATE bookingDates SET ')
  //     .exec()
  //     .then(data => {
  //       if (!data || !data.length) {
  //         next();
  //       } else {
  //         res.status(200).json(data);
  //       }
  //     })
  //     .catch(next);
  // },

  postRoom: (req, res) => {
    const roomId = req.params.id;
    db.pool.connect('INSERT INTO bookings')
      .then(data => {
          res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message
        })
      });
  },

  deleteRoom: (req, res) => {
    const roomId = req.params.id;
    db.pool.connect('DELETE FROM bookings WHERE id = $1', roomId)
      .then(data => {
        if (!data || !data.length) {
          return res.status(404).send({
            message: 'Booking not found with id ' + roomId
          })
        } else {
          res.send({message: 'Booking deleted!'});
        }
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'Booking not found with id ' + roomId
          });
        } else {
          return res.status(500).send({
            message: 'Could not delete booking with id ' + roomId
          })
        }
      });
  },  
};
