const { Schema, model, ObjectId } = require("mongoose");
const { timestamp } = require('../utils/dateFormat');


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
      type: String,
      default: timestamp
    },
    dueDate: {
      type: String,
      default: timestamp

    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],


  },

);

const Project = model('Project', projectSchema);

module.exports = Project;
