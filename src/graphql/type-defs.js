import { gql } from 'apollo-server-express';

export default gql`
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
