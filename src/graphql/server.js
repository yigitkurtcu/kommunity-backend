import { ApolloServer } from 'apollo-server-express';
import authenticationMiddleware from '$/middlewares/auth';

import typeDefs from './type-defs';
import resolvers from './resolvers';

const GRAPHQL_PATH = '/gql';
const GRAPHQL_PLAYGROUND_PATH = '/gql-dev';

export const initializeApolloServer = (app: express$Application) => {
  const serverConf = {
    typeDefs,
    resolvers,
  };

  // securing graphql endpoint on production
  app.use((req: express$Request, res: express$Response, next: express$NextFunction) => {
    if (req.path === GRAPHQL_PATH) {
      return authenticationMiddleware(req, res, next);
    }
    return next();
  });

  const server = new ApolloServer(serverConf);
  server.applyMiddleware({ app, path: GRAPHQL_PATH });

  if (process.env.NODE_ENV !== 'production') {
    const playgroundServer = new ApolloServer(serverConf);
    playgroundServer.applyMiddleware({ app, path: GRAPHQL_PLAYGROUND_PATH });
  }

  app.listen({ port: 4000 }, () => {
    /* eslint-disable no-console */
    console.log(`GRAPHQL 🚀  Server ready at http://localhost:4000${GRAPHQL_PATH}`);
    console.log(`GRAPHQL ✨  Playground server ready at http://localhost:4000${GRAPHQL_PLAYGROUND_PATH}`);
    /* eslint-enable no-console */
  });
};
