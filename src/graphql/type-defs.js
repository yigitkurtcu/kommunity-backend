import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

  enum CommunityTier {
    free
    tier1
    tier2
    tier3
  }

  enum CommunityType {
    public
    private
    secret
  }

  enum ConversationCategoryType {
    public
    private
    secret
  }

  enum ConversationCategoryRole {
    guest
    member
    moderator
    admin
  }

  enum UploadedItemType {
    user_avatar
    community_avatar
    post_attachment
  }

  type LoggedInUserDetails {
    uuid: ID!
    email: String!
    username: String
    firstName: String
    lastName: String
    userAttributes: String
    location: String
    avatarUploadUuid: ID
    lastSeenAt: Date
  }

  type UserDetails {
    uuid: ID!
    username: String
    location: String
    avatarUploadUuid: ID
    lastSeenAt: Date
  }
  
  type Community {
    uuid: String
    name: String
    tagline: String
    desc: String
    Users: [UserDetails]
  }

  type Query {
    getLoggedInUserDetails : LoggedInUserDetails
    getUserDetailsById(id: ID!): UserDetails
    searchCommunities(name: String!): [Community]
    findPopularCommunities: [Community]
  }
`;
