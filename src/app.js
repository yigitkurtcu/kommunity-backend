import { initializeExpressApp } from './app-init';
import { initializePassport } from './passport/init';
import { initializeRoutes } from './routes';
import { initializeApolloServer } from './graphql/server';

// initialize app
const app = initializeExpressApp();
initializePassport(app);
initializeRoutes(app);
initializeApolloServer(app);

module.exports = app;
