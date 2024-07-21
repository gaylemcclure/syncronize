const { User, Project, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("projects")
      }
      throw AuthenticationError;
    },
    proj: async (parent, args, context) => {
      if (context.user) {
        return Project.findOne({ _id: args._id }).populate("users").populate("tasks")
      }
    },
    projectTasks: async (parent, args, context) => {
      if (context.user) {
        return Task.find({ projectId: args.projectId })
      }
    },
    singleTask: async (parent, args, context) => {
      if (context.user) {
        return Task.findOne({ _id: args._id })
      }
    }
  },

  Mutation: {
    addUser: async (parent, { first, last, email, password, initials }) => {
      const user = await User.create({ first, last, email, password, initials, projects: [] });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    addProject: async (parent, { projectName, description }, context) => {
      const curUser = context.user._id;
      if (context.user) {
        const project = await Project.create({ projectName, description, createdBy: curUser, users: [curUser] })
       const user = await User.findOneAndUpdate(
        {_id: curUser},
        { $addToSet: { projects: project._id} },
        { new: true }
       );
       return user;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    addTask: async (parent, { title, description, status, projectId }, context) => {
      const curUser = context.user._id;
      if (context.user) {
        const task = await Task.create({ title, description, status, createdBy: curUser, projectId: projectId })
       const proj = await Project.findOneAndUpdate(
        {_id: projectId},
        { $addToSet: { tasks: task._id} },
        { new: true }
       );
       return proj;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    updateTask: async (parent, { _id, title, description, status, dueDate }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: _id },
          { $set: { title: title, description: description, status: status, dueDate: dueDate } },
          {new: true}
        )
       return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    deleteTask: async (parent, { _id }, context) => {
      if (context.user) {
        const task = await Task.findOneAndDelete(
          { _id: _id }
        )
       return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },

  },
};

module.exports = resolvers;
