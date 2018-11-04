#!/usr/bin/env node
import config from '../config';

const http = require('http');
const app = require('./app');

const { appServer: { port } } = config;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

/* istanbul ignore next */
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      /* eslint-disable-next-line no-console */
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      /* eslint-disable-next-line no-console */
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  /* eslint-disable-next-line no-console */
  console.log(`EXPRESS 🎢  Server is ready at http://localhost:${port}`);
});

module.exports = server;
