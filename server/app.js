const express = require('express');
const path = require('path');
const routes = require('./../routes');

const app = express();

app.set('port', process.env.PORT || 3001);

app.get('/', (req, res) => {
  res.redirect('/rooms/1');
});

app.use(express.static('public/'));
app.use(express.static('client/dist'));

app.get('/rooms/:id', (req, res) => {
  const reactPath = path.join(__dirname, '../public/index.html');
  res.sendFile(reactPath);
});

app.use('/api', routes);

module.exports = app;
