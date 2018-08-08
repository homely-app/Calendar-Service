const db = require('../models');

module.exports = {
  get: (req, res, next) => {
    const roomId = req.params.id;
    db.Booking.find({ roomId: roomId })
      .exec()
      .then(data => {
        if (!data || !data.length) {
          next();
        } else {
          res.json(data);
        }
      })
      .catch(next);
  },

  put: (req, res, next) => {
    const roomId = req.params.id;
    db.Booking.findByIdAndUpdate({roomId:roomId})
      .exec()
      .then(data => {
        if (!data || !data.length) {
          next();
        } else {
          res.json(data);
        }
      })
      .catch(next);
  },

  post: (req, res) => {
    const roomId = req.params.id;
    db.Booking.save()
      .then(data => {
          res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message
        })
      });
  },

  delete: (req, res) => {
    const roomId = req.params.id;
    db.Booking.findByIdAndRemove({roomId:roomId})
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
