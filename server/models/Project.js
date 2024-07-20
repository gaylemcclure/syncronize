const { Schema, model, ObjectId } = require("mongoose");


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
    createdBy: {
      type: String,
    },
    createdOn: {
      type: Date,
      default: new Date()
    },
    // dueDate: {
    //   type: Date,
    //   // Sets a default value of 12 weeks from now
    //   default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    // },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],


  },

);

const Project = model('Project', projectSchema);

module.exports = Project;
