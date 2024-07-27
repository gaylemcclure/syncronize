import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users($username: String!) {
    users(username: $username) {
      _id
      first
      last
      email
      initials
    }
  }
`;

export const QUERY_USER = gql`
  query user($_id: String!) {
    user(_id: $_id) {
      _id
      first
      last
      initials
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
        dueDate
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
        first
        last
      }
      tasks {
        _id
        title
        description
        createdOn
        status
        dueDate
        priority
        assignedTo {
          _id
        }
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
      createdBy {
        _id
      }
      assignedTo {
        _id
      }
      dueDate
      status
      projectId {
        _id
      }
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
      createdBy {
        _id
      }
      status
      dueDate
      priority
      projectId {
        _id
        projectName
        users {
          _id
          first
          last
          initials
        }
      }
      assignedTo {
        _id
        first
        last
        initials
      }
        comments {
                _id
        commentText
        createdOn,
        createdBy
        createdInitials
        }
        subtasks {
        _id
        taskTitle,
        taskStatus
        dueDate
        
        }
    }
  }
`;

export const QUERY_COMPLETED_TASKS = gql`
  query completedTasks($projectId: String!) {
    completedTasks(projectId: $projectId) {
      _id
      title
      description
      createdOn
      createdBy {
        _id
        initials
        first
        last
      }
      status
      projectId {
        _id
      }
    }
  }
`;

export const QUERY_FILTERS = gql`
  query queryFilters($projectId: ID!, $status: String, $priority: String) {
    queryFilters(projectId: $projectId, status: $status, priority: $priority) {
      _id
    }
  }
`;

