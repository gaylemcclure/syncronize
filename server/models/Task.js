const { Schema, model } = require('mongoose');

// Schema to create Task model
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    startDate: {
        type: Date,
        default: Date.now(),
        trim: true,
      },
    dueDate: {
        type: Date,
        default: Date.now(),
        trim: true,
      },
    // assignments: [assignmentSchema],
    status: {
        type: String,
        required: true,
        trim: true,
    },

  },

);

const Task = model('Task', taskSchema);

module.exports = Task;