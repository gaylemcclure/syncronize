const { Schema, model } = require('mongoose');
const commentSchema = require("./Comments");
const subtaskSchema = require("./Subtasks");

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
      default: new Date()
    },
    createdBy: {
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    startDate: {
      type: Date,
      default: new Date()
      },
    dueDate: {
      type: Date,
      default: new Date()
      },

    status: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
      type: String,
      default: "-"
    },
    projectId: { 
      type: Schema.Types.ObjectId, ref: 'Project' 
    },
    assignedTo: {
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    updatedOn: {
      type: Date,
      default: new Date()
    },
    comments: [ commentSchema ],
    subtasks: [ subtaskSchema ]

  },

);

const Task = model('Task', taskSchema);

module.exports = Task;