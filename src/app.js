import { initializeExpressApp } from './app-init';
import { initializePassport } from './passport/init';
import { initializeRoutes, initializeErrorRoutes } from './routes';

// initialize app
const app = initializeExpressApp();
initializePassport(app);
initializeRoutes(app);
initializeErrorRoutes(app);

module.exports = app;
