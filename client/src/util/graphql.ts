import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      id
      username
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    registerUser(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
      token
      id
      username
    }
  }
`;
