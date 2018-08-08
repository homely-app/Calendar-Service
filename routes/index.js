const express = require("express");
const ctrl = require("./../controllers");
const router = express.Router();

// Get info for bookings
router.get("/rooms/:id/bookings", ctrl.bookings.get);

// Put info for bookings
router.put("/rooms/:id/bookings", ctrl.bookings.put);

// Post info for bookings
router.post("/rooms/:id/bookings", ctrl.bookings.post);

// Delete info for bookings
router.delete("/rooms/:id/bookings", ctrl.bookings.delete);

module.exports = router;
