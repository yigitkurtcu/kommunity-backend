import { initializeExpressApp } from './setup-express';
import { initializePassport } from './passport';
import { initializeRoutes, initializeErrorRoutes } from './routes';

// initialize app
const app = initializeExpressApp();
initializePassport(app);
initializeRoutes(app);
initializeErrorRoutes(app);

module.exports = app;
