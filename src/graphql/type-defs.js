import { gql } from 'apollo-server-express';

export default gql`
  type Community {
    uuid: String
    name: String
    tagline: String
    desc: String
  }

  type Query {
    findCommunityByName(name: String!): [Community]
  }
`;
