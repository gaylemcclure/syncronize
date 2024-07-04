const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    initials: {
      type: String,
    },
    workspaceName: {
      type: String,
      default: "Main Space"
    }
    // user: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "project",
    //   },
    // ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
