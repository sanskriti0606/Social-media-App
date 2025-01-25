const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    photoURL: String
    isAdmin: Boolean
    followers: [Follow]!
    following: [Follow]!
  }

  type Follow {
    username: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    likeCount: Int!
    commentCount: Int!
    likes: [Like]!
    comments: [Comment]!
  }

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    createComment(postId: ID!, body: String!): Post! # Add this mutation
    updateUser(userId: ID!, photoURL: String!): User!
    followUser(username: String!): String!
    unfollowUser(username: String!): String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
`;
