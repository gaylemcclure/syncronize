const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create Task model
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max_length: 50,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
        type: Date,
        default: Date.now(),
      },
    dueDate: {
        type: Date,
        default: Date.now(),
      },
    // assignments: [assignmentSchema],
    status: {
        type: String,
        required: true,
    },
    user: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Task = model('task', taskSchema);

module.exports = Task;