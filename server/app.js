const express = require('express');
const routes = require('./../routes');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3001);

app.get('/', function(req, res) {
  res.redirect('/rooms/1');
});

app.use(express.static('public/'));
app.use(express.static('client/dist'));

app.get('/rooms/:id', function(req, res) {
  const reactPath = path.join(__dirname, '../public/index.html');
  res.sendFile(reactPath);
});

app.use('/api', routes);

module.exports = app;
