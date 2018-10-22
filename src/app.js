import { initializeExpressApp } from './app-init';
import { initializePassport } from './passport/init';
import { initializeRoutes } from './routes';

// initialize app
const app = initializeExpressApp();
initializePassport(app);
initializeRoutes(app);

module.exports = app;
