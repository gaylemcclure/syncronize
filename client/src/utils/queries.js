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
        tasks {
        _id
        title
        description
        createdOn
        createdBy
        status
        }
    }
  }
`;

export const QUERY_PROJECT_TASKS = gql`
  query projectTasks($projectId: String!) {
    projectTasks(projectId: $projectId) {
      _id
      title
      description
      createdOn
      createdBy
      status
    }
  }
`;

export const QUERY_TASK = gql`
  query singleTask($_id: String!) {
    singleTask(_id: $_id) {
      _id
      title
      description
      createdOn
      createdBy
      status
    }
  }
`;
