import http from 'http';
import { startServer } from '@/server';

let server;

beforeAll(() => {
  server = startServer();
});

test('server returns 401', (done) => {
  http.get('http://localhost:3008', (res) => {
    expect(res.statusCode).toBe(401);
    done();
  });
});

test('server - /health returns OK', (done) => {
  http.get('http://localhost:3008/health', (res) => {
    expect(res.statusCode).toBe(200);

    let response = '';
    res.on('data', (chunk) => {
      response += chunk;
    });

    res.on('end', () => {
      expect(response).toBe('OK');
      done();
    });
  });
});

afterAll(() => {
  server.close();
});
