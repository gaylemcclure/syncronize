const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

// Schema to create User model
const userSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
      trim: true,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
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
  // {
  //   toJSON: {
  //     getters: true,
  //   },
  // }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = model("User", userSchema);

module.exports = User;
