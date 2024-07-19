const { User, Project } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { generateProjectId } = require("../utils/projectToken");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

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

  },
};

module.exports = resolvers;
