const dotenv = require('dotenv').config();
const newRelic = require('newrelic');
const express = require('express');
const routes = require('./../routes');
const path = require('path');
const ctrl = require('../controllers');

const app = express();

app.set('port', process.env.PORT || 3005);

app.get('/', function(req, res) {
  res.redirect('/rooms/1');
});

app.use(express.static('public/'));
app.use(express.static('client/dist'));

// app.get('/rooms/:id', function(req, res) {
//   const reactPath = path.join(__dirname, '../public/index.html');
//   res.sendFile(reactPath);
// });

app.get('/rooms/:id', (req, res) => {
  console.log('inside get on server');
  const reactPath = path.join(__dirname, '../public/index.html');
  res.sendFile(reactPath);
});

// app.put('/rooms/:id', function(req, res) {
//   const reactPath = path.join(__dirname, '../public/index.html');
//   res.sendFile(reactPath);
// });

// app.post('/rooms/:id', function(req, res) {
//   const reactPath = path.join(__dirname, '../public/index.html');
//   res.sendFile(reactPath);
// });

// app.delete('/rooms/:id', function(req, res) {
//   const reactPath = path.join(__dirname, '../public/index.html');
//   res.sendFile(reactPath);
// });

app.use('/api', routes);

module.exports = app;
