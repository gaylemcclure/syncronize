const { Schema } = require('mongoose');

// Schema to create a project model
const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: 'A project name is required.',
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // dueDate: {
    //   type: Date,
    //   // Sets a default value of 12 weeks from now
    //   default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    // },

  },

);

// const Project = model('Project', projectSchema);

module.exports = projectSchema;
