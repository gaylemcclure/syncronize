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
    project: Project
    projects: [Project]
  }

  type Mutation {
    addUser(first: String!, last: String!, email: String!, password: String!, initials: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(projectName: String!, description: String) : Project


  }
`;

module.exports = typeDefs;
