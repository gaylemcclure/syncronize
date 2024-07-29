const { Schema, model, ObjectId } = require("mongoose");

// Schema to create a project model
const subtaskSchema = new Schema({
  taskId: {
    type: String,
  },
  taskTitle: {
    type: String,
    required: "A project name is required.",
    trim: true,
  },
  taskStatus: {
    type: Boolean,
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  dueDate: {
    type: Date,
  }
});

module.exports = subtaskSchema;
