import { gql } from 'apollo-server-express';
// import type App from '$/../lib/App';

export const getTypeDefs = (/* app: App */) => {
  return gql`
    type User {
      email: String
    }

    type Community {
      uuid: String
      name: String
      tagline: String
      desc: String
      Users: [User]
    }

    type Query {
      searchCommunities(name: String!): [Community],
      findPopularCommunities: [Community],
    }
  `;
};
