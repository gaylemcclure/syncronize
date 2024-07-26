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
    dueDate: {
      type: Date,
      default: new Date()

    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },

);

const Project = model('Project', projectSchema);

module.exports = Project;
