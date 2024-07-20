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
    addUser(first: String!, last: String!, email: String!, password: String!, initials: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(projectName: String!, description: String) : Project
    addTask(title: String!, description: String, status: String, projectId: String) : Task


  }
`;

module.exports = typeDefs;
