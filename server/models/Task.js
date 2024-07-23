const { Schema, model } = require('mongoose');
const { timestamp } = require('../utils/dateFormat');

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
    createdOn: {
      type: String,
      default: timestamp
    },
    createdBy: {
      type: String,
    },
    startDate: {
      type: String,
      default: timestamp
      },
    dueDate: {
      type: String,
      default: timestamp
      },

    status: {
        type: String,
        required: true,
        trim: true,
    },
    projectId: { 
      type: Schema.Types.ObjectId, ref: 'Project' 
    },
    assignedTo: {
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    updatedOn: {
      type: String,
      default: timestamp
    }


  },

);

const Task = model('Task', taskSchema);

module.exports = Task;