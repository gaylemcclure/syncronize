const { Project} = require('../models');

module.exports = {

  // Get all projects
  async getAllProjects(req, res) {
    try {
      const projects = await Project.find()
      //.populate('students');
      res.json(projects);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a project
  async getProjectById(req, res) {
    try {
      console.log(req)
      const project = await Project.findOne({ _id: req.params.id })
        // .populate('students');

      if (!project) {
        return res.status(404).json({ message: 'No project with that ID' });
      }

      res.json(project);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a project
  async createProject(req, res) {
    try {
      const project = await Project.create({
        projectName: req.body.projectName,
        description: req.body.description,
        dueDate: req.body.dueDate
      });
      res.json(project);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a project
  async deleteProject(req, res) {
    // try {
    //   const course = await Course.findOneAndDelete({ _id: req.params.courseId });

    //   if (!course) {
    //     res.status(404).json({ message: 'No course with that ID' });
    //   }

    //   await Student.deleteMany({ _id: { $in: course.students } });
    //   res.json({ message: 'Course and students deleted!' });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  },

  // Update a project
  async updateProject(req, res) {
    // try {
    //   const course = await Course.findOneAndUpdate(
    //     { _id: req.params.courseId },
    //     { $set: req.body },
    //     { runValidators: true, new: true }
    //   );

    //   if (!course) {
    //     res.status(404).json({ message: 'No course with this id!' });
    //   }

    //   res.json(course);
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  },
};
