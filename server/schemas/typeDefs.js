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
    projectName: String!
    description: String
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
    me: User
  }

  type Mutation {
    addUser(first: String!, last: String!, email: String!, password: String!, initials: String!): Auth
    addProject(projectName: String!, description: String) : User
  }
`;

module.exports = typeDefs;
