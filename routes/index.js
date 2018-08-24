const express = require("express");
const ctrl = require("./../controllers");
const router = express.Router();

// Get info for calendar
router.get("/rooms/:id/calendar", ctrl.calendar.getRoom);

// Put info for calendar
//router.put("/rooms/:id/calendar", ctrl.calendar.putRoom);

// Post info for calendar
// router.post("/rooms/:id/calendar", ctrl.calendar.postRoom);

// Delete info for calendar
// router.delete("/rooms/:id/calendar", ctrl.calendar.deleteRoom);

module.exports = router;
