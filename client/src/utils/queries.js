import { gql } from '@apollo/client';

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
    }
  }
`;
