const typeDefs = `
  type User {
    _id: ID
    first: String!
    last: String!
    email: String!
    password: String!
    initials: String!
    workspaceName: String
    createdOn: String
    projects: [Project]
  }

  type Project {
    _id: ID
    createdBy: String
    createdOn: String
    projectName: String!
    description: String
    dueDate: String
    users: [User]
    tasks: [Task]

  }

  type Task {
    _id: ID
    title: String!
    description: String
    createdOn: String
    createdBy: User
    startDate: String
    dueDate: String
    status: String
    projectId: Project
    assignedTo: User
    updatedOn: String
    priority: String

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
    completedTasks(projectId: String!) : [Task]
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(first: String!, last: String!, email: String!, password: String!, initials: String!): Auth
    addProject(projectName: String!, description: String, dueDate: String) : Project
    addTask(title: String!, description: String, status: String, projectId: String, dueDate: String, priority: String, assignedTo: String) : Task

    updateUser(_id: ID!, first: String!, last: String!, email: String!, password: String!, initials: String!) : User
    updateProject(_id: ID!, projectName: String!, description: String, dueDate: String): Project
    updateTask(_id: ID!, title: String!, description: String, status: String, dueDate: String, assignedTo: String ) : Task

    deleteUser(_id: ID!) : User
    deleteProject(_id: ID!) : Project
    deleteTask(_id: ID!) : Task
  }
`;

module.exports = typeDefs;
