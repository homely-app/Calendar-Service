const express = require('express');
const ctrl = require('./../controllers');
const router = express.Router();

router.get('/bookings/:id', ctrl.bookings.get);
module.exports = router;
