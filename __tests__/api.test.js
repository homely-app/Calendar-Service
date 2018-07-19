const request = require('supertest');
const app = require('../server/app');

describe('API', () => {
  test('Should get a response the GET method', () => {
    return request(app)
      .get('/api/bookings/1')
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
