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
    createdOn: {
      type: Date,
      default: Date.now,
      // get: (timestamp) => dateFormat(timestamp),
    },
    createdBy: {
      type: String,
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
      type: Date,
      default: Date.now()
    }


  },

);

const Task = model('Task', taskSchema);

module.exports = Task;