#!/usr/bin/env node
import { getAppConfig } from '../config/config';

const http = require('http');
const app = require('./app');

export const startServer = () => {
  const config = getAppConfig();
  const { port } = config.appServer;
  // TODO remove 3008 here, add NODE_ENV to npm script
  app.set('port', port || 3008);

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
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    /* eslint-disable-next-line no-console */
    console.log(`Listening on ${bind}`);
  });

  return server;
};
