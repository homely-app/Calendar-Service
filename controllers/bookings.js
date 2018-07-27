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
          // console.log('sample items', data[0].bookings);
          res.json(data);
        }
      })
      .catch(next);
  },

  create: function(req, res) {}
};
