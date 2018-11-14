import http from 'http';
import App from '../../lib/App';

const app: App = require('$/app');

test('app server returns 404', (done) => {
  http.get('http://localhost:4008/unknown-route', (res) => {
    expect(res.statusCode).toBe(404);
    done();
  });
});

test('app server returns 401', (done) => {
  http.get('http://localhost:4008/api/v1/member/me', (res) => {
    expect(res.statusCode).toBe(401);
    done();
  });
});

test('app server - /health returns OK', (done) => {
  http.get('http://localhost:4008/health', (res) => {
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

afterAll((done) => {
  app.appServer.close(done);
});
