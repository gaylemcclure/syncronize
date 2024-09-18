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
        avatarColour
      }
    }
  }
`;
export const ADD_PROJECT = gql`
  mutation addProject($projectName: String!, $description: String, $dueDate: Date) {
    addProject(projectName: $projectName, description: $description, dueDate: $dueDate) {
      _id
      dueDate
    }
  }
`;
export const ADD_TASK = gql`
  mutation addTask($title: String!, $description: String, $status: String, $projectId: String, $priority: String, $dueDate: Date, $assignedTo: ID) {
    addTask(
      title: $title
      description: $description
      status: $status
      projectId: $projectId
      priority: $priority
      dueDate: $dueDate
      assignedTo: $assignedTo
    ) {
      _id
    }
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($taskId: String!, $commentText: String!, $createdBy: String, $createdInitials: String!) {
    addComment(taskId: $taskId, commentText: $commentText, createdBy: $createdBy, createdInitials: $createdInitials) {
      _id
      comments {
        _id
        commentText
        createdBy
        createdInitials
        createdOn
      }
    }
  }
`;
export const ADD_SUBTASK = gql`
  mutation addSubtask($taskId: String!, $taskTitle: String!, $taskStatus: Boolean, $dueDate: Date) {
    addSubtask(taskId: $taskId, taskTitle: $taskTitle, taskStatus: $taskStatus, dueDate: $dueDate) {
      _id
      subtasks {
        _id
        taskTitle
        taskStatus
        dueDate
      }
    }
  }
`;
export const ADD_USER_TO_PROJECT = gql`
  mutation addNewUserToProject($first: String!, $last: String!, $email: String!, $password: String!, $initials: String!, $projectId: String) {
    addNewUserToProject(first: $first, last: $last, email: $email, password: $password, initials: $initials, projectId: $projectId) {
      token
      user {
        _id
        first
        last
        email
        initials
        avatarColour
        projects {
          _id
        }
      }
    }
  }
`;

export const ADD_EXISTING_USER_TO_PROJECT = gql`
  mutation addExistingUserToProject($email: String!, $projectId: ID, $userToken: ID) {
    addExistingUserToProject(email: $email, projectId: $projectId, userToken: $userToken) {
      token
      user {
        _id
        first
        last
        email
        initials,
        avatarColour
        projects{
          _id
        }
      }
    }
  }
`;

// UPDATE MUTATIONS
export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $first: String!, $last: String!, $email: String!, $initials: String!, $avatarColour: String) {
    updateUser(_id: $_id, first: $first, last: $last, email: $email, initials: $initials, avatarColour: $avatarColour) {
      _id
      avatarColour
    }
  }
`;
export const UPDATE_PROJECT = gql`
  mutation updateProject($_id: ID!, $projectName: String!, $description: String, $dueDate: Date) {
    updateProject(_id: $_id, projectName: $projectName, description: $description, dueDate: $dueDate) {
      _id
      projectName
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation updateTask($_id: ID!, $title: String!, $description: String, $status: String, $dueDate: Date, $priority: String, $assignedTo: String) {
    updateTask(
      _id: $_id
      title: $title
      description: $description
      status: $status
      dueDate: $dueDate
      priority: $priority
      assignedTo: $assignedTo
    ) {
      _id
      description
      priority
      status
      title
      dueDate
    }
  }
`;
export const UPDATE_PROJECT_NAME = gql`
  mutation updateProjectName($_id: ID!, $projectName: String!) {
    updateProjectName(_id: $_id, projectName: $projectName) {
      _id
      projectName
    }
  }
`;
export const UPDATE_PROJECT_DESCRIPTION = gql`
  mutation updateProjectDescription($_id: ID!, $description: String) {
    updateProjectDescription(_id: $_id, description: $description) {
      _id
      description
    }
  }
`;
export const UPDATE_PROJECT_DATE = gql`
  mutation updateProjectDate($_id: ID!, $dueDate: Date) {
    updateProjectDate(_id: $_id, dueDate: $dueDate) {
      _id
      dueDate
    }
  }
`;
export const UPDATE_SUBTASK = gql`
  mutation updateSubtask($_id: String!, $subtasks: SubtaskArray) {
    updateSubtask(_id: $_id, subtasks: $subtasks) {
      _id
    }
  }
`;

export const UPDATE_WORKSPACE = gql`
  mutation updateWorkspace($_id: String!, $workspaceName: String) {
    updateWorkspace(_id: $_id, workspaceName: $workspaceName) {
      _id
      workspaceName
    }
  }
`;
// DELETE MUTATIONS
export const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;
export const DELETE_PROJECT = gql`
  mutation deleteProject($_id: ID!) {
    deleteProject(_id: $_id) {
      _id
      users {
        _id
      }
    }
  }
`;
export const DELETE_TASK = gql`
  mutation deleteTask($_id: ID!) {
    deleteTask(_id: $_id) {
      _id
    }
  }
`;
export const DELETE_COMMENT = gql`
  mutation deleteComment($_id: ID!, $taskId: String!) {
    deleteComment(_id: $_id, taskId: $taskId) {
      comments {
        _id
        commentText
        createdBy
        createdInitials
        createdOn
      }
    }
  }
`;
export const DELETE_SUBTASK = gql`
  mutation deleteSubtask($_id: ID!, $taskId: String!) {
    deleteSubtask(_id: $_id, taskId: $taskId) {
      _id
    }
  }
`;

export const SEND_NEW_EMAIL = gql`
  mutation sendNewUserEmail($email: String!, $senderEmail: String, $projectId: ID, $projectName: String, $first: String, $last: String) {
    sendNewUserEmail(email: $email, senderEmail: $senderEmail, projectId: $projectId, projectName: $projectName, first: $first, last: $last) {
      responseMsg
    }
  }
`;
export const SEND_EXISTING_EMAIL = gql`
  mutation sendExistingUserEmail(
    $email: String!
    $senderEmail: String
    $projectId: ID
    $projectName: String
    $first: String
    $last: String
    $userToken: ID
  ) {
    sendExistingUserEmail(
      email: $email
      senderEmail: $senderEmail
      projectId: $projectId
      projectName: $projectName
      first: $first
      last: $last
      userToken: $userToken
    ) {
      responseMsg
    }
  }
`;
