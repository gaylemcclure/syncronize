const typeDefs = `
  type User {
    _id: ID
    first: String!
    last: String!
    email: String!
    password: String!
    initials: String!
    workspaceName: String
    projects: [Project]
  }

  type Project {
    _id: ID
    createdBy: String
    createdOn: String
    projectName: String!
    description: String
    users: [User]
    tasks: [Task]

  }

  type Task {
    _id: ID
    title: String!
    description: String
    createdOn: String
    createdBy: String
    startDate: String
    dueDate: String
    status: String
    projectId: Project
    assignedTo: User
    updatedOn: String

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    me: User
    proj(_id: String!): Project
    projectTasks(projectId: String!): [Task] 
    singleTask(_id: String!): Task
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(first: String!, last: String!, email: String!, password: String!, initials: String!): Auth
    addProject(projectName: String!, description: String) : Project
    addTask(title: String!, description: String, status: String, projectId: String) : Task

    updateProject(_id: ID!, projectName: String!, description: String, dueDate: String): Project
    updateTask(_id: ID!, title: String!, description: String, status: String, dueDate: String) : Task

    deleteTask(_id: ID!) : Task
  }
`;

module.exports = typeDefs;
