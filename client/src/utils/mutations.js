import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($first: String!, $last: String!, $email: String!, $password: String!, $initials: String!) {
    addUser(first: $first, last: $last, email: $email, password: $password, initials: $initials) {
      token
      user {
        _id
        first
        last
        email
        initials
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($projectName: String!, $description: String) {
    addProject(projectName: $projectName, description: $description) {
      _id
    }
  }
`;

