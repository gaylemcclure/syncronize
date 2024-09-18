const { User, Project, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const nodemailer = require("nodemailer");
const { newUserEmail, existingUserEmail } = require("../utils/emailHelper");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    usersEmail: async (parent, args, context) => {
      return User.find({ email: args.email });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate({ path: "projects", populate: { path: "createdBy", model: "User" } })
          .populate({ path: "projects", populate: { path: "users", model: "User" } })
          .populate({ path: "projects", populate: { path: "tasks", model: "Task" } })
          .populate({ path: "projects", populate: { path: "tasks", populate: { path: "assignedTo", model: "User" } } })
          .populate("tasks")
          .populate({ path: "tasks", populate: { path: "assignedTo", model: "User" } });
      }
      throw AuthenticationError;
    },
    meAccount: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }

      throw AuthenticationError;
    },
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({ path: "projects", populate: { path: "createdBy", model: "User" } });
      }
      throw AuthenticationError;
    },

    proj: async (parent, args, context) => {
      if (context.user) {
        return Project.findOne({ _id: args._id }).populate("users").populate("tasks").populate("createdBy");
      }
    },
    projectTasks: async (parent, args, context) => {
      if (context.user) {
        return Task.find({ projectId: args.projectId });
      }
    },
    singleTask: async (parent, args, context) => {
      if (context.user) {
        return Task.findOne({ _id: args._id })
          .populate({ path: "projectId", populate: { path: "users", model: "User" } })
          .populate("assignedTo");
      }
    },
    completedTasks: async (parent, args, context) => {
      if (context.user) {
        return Task.find({
          $and: [{ projectId: args.projectId }, { status: "TESTING" }],
        });
      }
    },
    queryFilters: async (parent, { projectId, status, priority }, context) => {
      if (context.user) {
        if (status === "" && priority !== "") {
          console.log("priority only");
          return Task.find({
            $and: [{ projectId: projectId }, { priority: priority }],
          });
        } else if (priority === "" && status !== "") {
          console.log("status only");
          return Task.find({
            $and: [{ projectId: projectId }, { status: status }],
          });
        } else if (status !== "" && priority !== "") {
          console.log("both");
          return Task.find({
            $and: [{ projectId: projectId }, { status: status }, { priority: priority }],
          });
        } else {
          console.log("none");
          return Task.find({ projectId: projectId });
        }
      }
    },
    allTasks: async () => {
      return Task.find();
    },
  },

  Mutation: {
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
    //CREATE MUTATIONS
    addUser: async (parent, { first, last, email, password, initials }) => {
      const user = await User.create({ first, last, email, password, initials, projects: [], tasks: [] });
      const token = signToken(user);
      return { token, user };
    },

    addProject: async (parent, { projectName, description, dueDate }, context) => {
      const curUser = context.user._id;
      if (context.user) {
        const project = await Project.create({ projectName, description, dueDate, createdBy: curUser, users: [curUser], tasks: [] });
        const user = await User.findOneAndUpdate({ _id: curUser }, { $addToSet: { projects: project._id } }, { new: true });
        return user;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    addTask: async (parent, { title, description, status, projectId, dueDate, assignedTo, priority }, context) => {
      const curUser = context.user._id;

      if (context.user) {
        const task = await Task.create({
          title,
          description,
          status,
          createdBy: curUser,
          projectId: projectId,
          dueDate: dueDate,
          priority: priority,
          assignedTo: assignedTo,
        });
        const taskId = task._id.toString();
        const proj = await Project.findOneAndUpdate({ _id: projectId }, { $addToSet: { tasks: task._id } }, { new: true });
        const user = await User.findOneAndUpdate({ _id: curUser }, { $addToSet: { tasks: taskId } }, { new: true });

        return user;
      }
      throw AuthenticationError("You need to be logged in!");
    },

    addComment: async (parent, { taskId, commentText, createdBy, createdInitials }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: taskId },
          {
            $addToSet: { comments: { taskId: taskId, commentText: commentText, createdBy: createdBy, createdInitials: createdInitials } },
          },
          { new: true }
        );
        return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },

    addSubtask: async (parent, { taskId, taskTitle, taskStatus, dueDate }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: taskId },
          {
            $addToSet: { subtasks: { taskId, taskTitle, taskStatus, dueDate } },
          },
          { new: true }
        );
        return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },

    addNewUserToProject: async (parent, { first, last, email, password, initials, projectId }) => {
      const projectTasks = await Project.findOne({ _id: projectId });
      const user = await User.create({ first, last, email, password, initials, projects: [projectId], tasks: projectTasks.tasks });
      const token = signToken(user);
      const findProject = await Project.findOneAndUpdate({ _id: projectId }, { $addToSet: { users: user._id } }, { new: true });

      return { token, user };
    },
    addExistingUserToProject: async (parent, { email, projectId, userToken }) => {
      const projectTasks = await Project.findOne({ _id: projectId });
      const updateUser = await User.findOneAndUpdate({ _id: userToken }, { $addToSet: { projects: projectId, tasks: projectTasks.tasks }}, { new: true });
      const updateProject = await Project.findOneAndUpdate({ _id: projectId }, { $addToSet: { users: updateUser._id } }, { new: true });
      const user = await User.findOne({_id: userToken});
      const token = signToken(user);
      return { token, user };
    },

    //UPDATE MUTATIONS
    updateUser: async (parent, { _id, first, last, email, initials, avatarColour }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: _id },
          { $set: { first: first, last: last, email: email, initials: initials, avatarColour: avatarColour } },
          { new: true }
        );
        const token = signToken(user);
        return { token, user };
      }
      throw AuthenticationError("You need to be logged in!");
    },
    updateProject: async (parent, { _id, projectName, description, dueDate }, context) => {
      if (context.user) {
        const project = await Project.findOneAndUpdate(
          { _id: _id },
          { $set: { projectName: projectName, description: description, dueDate: dueDate } },
          { new: true }
        );
        return project;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    updateTask: async (parent, { _id, title, description, status, dueDate, priority, assignedTo }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: _id },
          { $set: { title: title, description: description, status: status, dueDate: dueDate, priority: priority, assignedTo: assignedTo } },
          { new: true }
        );
        return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },

    updateProjectName: async (parent, { _id, projectName }, context) => {
      if (context.user) {
        const project = await Project.findOneAndUpdate({ _id: _id }, { $set: { projectName: projectName } }, { new: true });
        return project;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    updateProjectDescription: async (parent, { _id, description }, context) => {
      if (context.user) {
        const project = await Project.findOneAndUpdate({ _id: _id }, { $set: { description: description } }, { new: true });
        return project;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    updateProjectDate: async (parent, { _id, dueDate }, context) => {
      if (context.user) {
        const project = await Project.findOneAndUpdate({ _id: _id }, { $set: { dueDate: dueDate } }, { new: true });
        return project;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    updateSubtask: async (parent, { _id, subtasks }, context) => {
      if (context.user) {
        const task = await Task.updateOne({ _id: _id }, { $set: { subtasks: subtasks } }, { new: true });
        return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },

    updateWorkspace: async (parent, { _id, workspaceName }, context) => {
      if (context.user) {
        const task = await User.findOneAndUpdate({ _id: _id }, { $set: { workspaceName: workspaceName } }, { new: true });
        return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },

    //DELETE MUTATIONS
    deleteUser: async (parent, { _id }, context) => {
      if (context.user) {
        const findUser = await User.findOne({ _id: _id });
        const projs = findUser.projects.map(
          async (proj) => await Project.findOneAndUpdate({ _id: proj._id }, { $pull: { users: _id } }, { new: true })
        );
        const user = await User.findOneAndDelete({ _id: _id });
        return user;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    deleteProject: async (parent, { _id }, context) => {
      if (context.user) {
        const proj = await Project.findOne({ _id: _id }).populate("users");
        const userArr = proj.users;
        userArr.map(async (user) => {
          await User.findOneAndUpdate({ _id: user._id }, { $pull: { projects: _id } }, { new: true });
        });
        const deleteTasks = await Task.deleteMany({ projectId: _id });
        const deleteProj = await Project.findOneAndDelete({ _id: _id });
        return deleteProj;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    deleteTask: async (parent, { _id }, context) => {
      if (context.user) {
        const task = await Task.findOneAndDelete({ _id: _id });
        return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    deleteComment: async (parent, { taskId, _id }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate({ _id: taskId }, { $pull: { comments: { _id: _id } } }, { new: true });
        return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    deleteSubtask: async (parent, { taskId, _id }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate({ _id: taskId }, { $pull: { subtasks: { _id: _id } } }, { new: true });
        return task;
      }
      throw AuthenticationError("You need to be logged in!");
    },

    //Email mutations
    sendNewUserEmail: async (parent, { email, senderEmail, projectId, projectName, first, last }) => {
      const emailResponseMessage = await newUserEmail(email, senderEmail, projectId, projectName, first, last);
      return emailResponseMessage;
    },
    sendExistingUserEmail: async (parent, { email, senderEmail, projectId, projectName, first, last, userToken }) => {
      const emailResponseMessage = await existingUserEmail(email, senderEmail, projectId, projectName, first, last, userToken);
      return emailResponseMessage;
    },
  },
};

module.exports = resolvers;
