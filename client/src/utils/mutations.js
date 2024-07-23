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

// CREATE MUTATIONS
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
  mutation addProject($projectName: String!, $description: String, $dueDate: String) {
    addProject(projectName: $projectName, description: $description, dueDate: $dueDate) {
      _id
      dueDate
    }
  }
`;
export const ADD_TASK = gql`
  mutation addTask($title: String!, $description: String, $status: String, $projectId: String) {
    addTask(title: $title, description: $description, status: $status, projectId: $projectId) {
      _id
    }
  }
`;


// UPDATE MUTATIONS
export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $first: String!, $last: String!, $email: String!, $password: String!, $initials: String! ) {
    updateProject(_id: $_id, first: $first, last: $last, email: $email, password: $password, initials: $initials ) {
      _id
    }
  }
`;
export const UPDATE_PROJECT = gql`
  mutation updateProject($_id: ID!, $projectName: String!, $description: String, $dueDate: String ) {
    updateProject(_id: $_id, projectName: $projectName, description: $description, dueDate: $dueDate ) {
      _id
projectName
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation updateTask($_id: ID!, $title: String!, $description: String, $status: String, $dueDate: String ) {
    updateTask(_id: $_id, title: $title, description: $description, status: $status, dueDate: $dueDate ) {
      _id
      description
    }
  }
`;

// DELETE MUTATIONS
export const DELETE_USER = gql`
  mutation deleteUser($_id: ID! ) {
    deleteUser(_id: $_id ) {
      _id
    }
  }
`;
export const DELETE_PROJECT = gql`
  mutation deleteProject($_id: ID! ) {
    deleteProject(_id: $_id ) {
      _id
    }
  }
`;
export const DELETE_TASK = gql`
  mutation deleteTask($_id: ID! ) {
    deleteTask(_id: $_id ) {
      _id
    }
  }
`;

