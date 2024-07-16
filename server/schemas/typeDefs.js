const typeDefs = `
  type User {
    _id: ID
    first: String
    last: String
    email: String
    password: String
    initials: String
    workspaceName: String
  }

  type Project {
    _id: ID
    projectName: String
    description: String
    dueDate: String
    tasks: [Task]!
  }

  type Task {
    _id: ID
    title: String
    description: String
    createdAt: String
    startDate: String
    dueDate: String
    status: String

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    project(projectId: ID!): Project
    projects: [Project]
    tasks: [Task]
    task(taskId: ID!): Task
    me: User
  }

  type Mutation {
    addUser(first: String!, last: String!, email: String!, password: String!, initials: String!): Auth
    login(email: String!, password: String!): Auth

  }
`;

module.exports = typeDefs;
