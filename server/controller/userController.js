// const { Course, Student } = require('../models');
const { User } = require("../models");

module.exports = {
  //get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        // headCount: await headCount(),
      };
      console.log(users)
      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //get single user
  //create new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete a user
  //update a user
};
