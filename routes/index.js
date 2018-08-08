const express = require("express");
const ctrl = require("./../controllers");
const router = express.Router();

router.get("/rooms/:id/bookings", ctrl.bookings.get);
module.exports = router;
