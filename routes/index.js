const express = require('express');

const ctrl = require('./../controllers');

const router = express.Router();

router.get('/repos', function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  ctrl.handleDatabaseRead(data => {
    res.send(data);
  });
});

module.exports = router;
