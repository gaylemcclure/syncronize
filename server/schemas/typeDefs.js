const typeDefs = `

  scalar Date

  type User {
    _id: ID
    first: String!
    last: String!
    email: String!
    password: String!
    initials: String!
    workspaceName: String
    createdOn: Date
    projects: [Project]
  }

  type Project {
    _id: ID
    createdBy: String
    createdOn: Date
    projectName: String!
    description: String
    dueDate: Date
    users: [User]
    tasks: [Task]

  }

  type Task {
    _id: ID
    title: String!
    description: String
    createdOn: Date
    createdBy: User
    startDate: Date
    dueDate: Date
    status: String
    projectId: Project
    assignedTo: User
    updatedOn: Date
    priority: String
    comments: [ Comment ]
    subtasks: [ Subtask ]

  }

  type Comment {
    _id: ID
    taskId: String!
    commentText: String
    createdBy: String
    createdOn: Date
    createdInitials: String
  }

  type Subtask {
    _id: ID
    taskId: String!
    taskTitle: String!
    taskStatus: Boolean
    createdOn: Date
    dueDate: Date
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    me: User
    user(_id: String!): User
    proj(_id: String!): Project
    projectTasks(projectId: String!): [Task] 
    singleTask(_id: String!): Task
    completedTasks(projectId: String!) : [Task]
  }

  input SubtaskArray {
    subtasks: [ SubtaskInput ]
  }

  input SubtaskInput {
      _id: ID
    taskId: String!
    taskTitle: String!
    taskStatus: Boolean
    createdOn: Date
    dueDate: Date
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(first: String!, last: String!, email: String!, password: String!, initials: String!): Auth
    addProject(projectName: String!, description: String, dueDate: Date) : Project
    addTask(title: String!, description: String, status: String, projectId: String, dueDate: Date, priority: String, assignedTo: String) : Task
    addComment(taskId: String!, commentText: String, createdBy: String, createdInitials: String) : Task
    addSubtask(taskId: String!, taskTitle: String!, taskStatus: Boolean, dueDate: Date) : Task

    updateUser(_id: ID!, first: String!, last: String!, email: String!, password: String!, initials: String!) : User
    updateProject(_id: ID!, projectName: String!, description: String, dueDate: Date): Project
    updateTask(_id: ID!, title: String!, description: String, status: String, dueDate: Date, assignedTo: String, priority: String ) : Task
    updateProjectName(_id:ID!, projectName: String!) : Project
    updateProjectDescription(_id:ID!, description: String) : Project
    updateProjectDate(_id:ID!, dueDate: Date) : Project
    updateSubtask(_id: String!, subtasks: SubtaskArray ) : Task
    updateWorkspace(_id: ID!, workspaceName: String) : User

    deleteUser(_id: ID!) : User
    deleteProject(_id: ID!) : Project
    deleteTask(_id: ID!) : Task
    deleteComment(taskId: String, _id: ID!) : Task
    deleteSubtask(taskId: String) : Task
  }
`;

module.exports = typeDefs;
