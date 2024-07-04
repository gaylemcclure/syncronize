const router = require("express").Router();
const { getAllProjects, getProjectById, createProject } = require('../../controller/projectController')


//Get all projects by user, Create new project
router.route("/").get(getAllProjects).post(createProject);

//Get single project by id
router.route("/:id").get(getProjectById);

//Update project
//Delete project


module.exports = router;