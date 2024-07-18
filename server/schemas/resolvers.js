const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
    }
  },

  Mutation: {
    addUser: async (parent, { first, last, email, password, initials }) => {
      const user = await User.create({ first, last, email, password, initials, projects: [] });
      const token = signToken(user);
      return { token, user };
    },
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });
    //   if (!user) {
    //     throw AuthenticationError;
    //   }
    //   const correctPw = await user.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw AuthenticationError;
    //   }
    //   const token = signToken(user);
    //   return { token, user };
    // },
    addProject: async (parent, {projectName, description}, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: {
            projectName,
            description,
          } } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw AuthenticationError ("You need to be logged in!");
    },

  },
};

module.exports = resolvers;
