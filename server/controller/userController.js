const { User } = require("../models");

module.exports = {
  //get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //get single user
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: "Can't find a user with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    //get single user by name
    async getUserByName(req, res) {
      try {
        const users = await User.find({});
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

  //create new user
  async createUser(req, res) {
    try {
      const user = await User.create({
        first: req.body.firstName,
        last: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        initials: req.body.initials
      });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete a user
  //update a user
};
