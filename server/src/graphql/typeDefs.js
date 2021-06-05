import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    token: String!
    username: String!
    email: String!
    password: String!
    createdAt: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }
  type Meal {
    id: ID!
    name: String
    description: String
    price: Float
  }
  type Query {
    meals: [Meal]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User!
    loginUser(username: String!, password: String!): User!
  }
`;

export default typeDefs;
