// tests/app.test.js
const request = require('supertest');
const app = require('../app');

describe('Application Tests', () => {
  describe('GET /', () => {
    it('should return the landing page', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/html/);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
    });
  });

  describe('GET /api/status', () => {
    it('should return operational status', async () => {
      const response = await request(app).get('/api/status');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'operational');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('POST /api/data', () => {
    it('should process data successfully', async () => {
      const testData = { data: 'test-data' };
      const response = await request(app)
        .post('/api/data')
        .send(testData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('processed', true);
      expect(response.body).toHaveProperty('originalData', 'test-data');
    });
  });
});