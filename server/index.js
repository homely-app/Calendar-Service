const express = require('express');
const routes = require('./../routes');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public/'));
app.use(express.static('client/dist'));

app.use('/api', routes);

app.listen(port, () => console.log(`listening on port ${port}!`));
