import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      first
      last
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      first
      last
      email
      initials
      workspaceName
      projects {
        _id
        projectName
        description
      }
    }
  }
`;

export const QUERY_PROJECT = gql`
  query proj($_id: String!) {
    proj(_id: $_id) {
      _id
      projectName
      description
      createdOn
      createdBy
      users {
        _id
        initials
      }
    }
  }
`;
