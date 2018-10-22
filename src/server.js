#!/usr/bin/env node
const http = require('http');
const app = require('./app');

export const startServer = (config: AppSettings) => {
  const { port } = config.appServer;
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port);

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
