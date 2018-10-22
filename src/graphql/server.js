import { ApolloServer } from 'apollo-server-express';
import typeDefs from './type-defs';
import resolvers from './resolvers';

export const initializeApolloServer = (app: express$Application) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });
  // eslint-disable-next-line no-console
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};
