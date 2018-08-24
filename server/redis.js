const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis is connected');
});

client.on('error', (err) => {
  console.log('Redis is having an error connecting: ', err);
})

module.exports = client;
