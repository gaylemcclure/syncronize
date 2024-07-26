const { Schema, model, ObjectId } = require("mongoose");

// Schema to create a project model
const commentSchema = new Schema({
  taskId: {
    type: String,
  },
  commentText: {
    type: String,
    required: "A project name is required.",
    trim: true,
  },
  createdBy: {
    type: String,
  },
  createdInitials: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = commentSchema;
