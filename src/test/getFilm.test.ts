const request = require('supertest');

describe('GET /films', () => {
  it('should return a list of films', async () => {
    const response = await request('https://swapi.py4e.com/api').get('/films/');
    expect(response.status).toEqual(200);
    expect(response.body.results).toBeInstanceOf(Array);
    expect(response.body.results.length).toBeGreaterThan(0);
  });
});