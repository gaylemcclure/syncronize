const { Schema, model } = require('mongoose');

// Schema to create a project model
const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      // Sets a default value of 12 weeks from now
      default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'task',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Project = model('project', projectSchema);

module.exports = Project;
