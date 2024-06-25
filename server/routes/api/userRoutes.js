const router = require("express").Router();
const { getAllUsers, createUser} = require('../../controller/userController');

// render login page
// router.get("/", async (req, res) => {
//     try {
//         console.log(res)
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

router.route('/').get(getAllUsers).post(createUser);

// // Render the signup form
// router.get("/", async (req, res) => {
//     try {
//         res.render("signup"); // Assuming you have a view named "signup"
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

module.exports = router;


// // /api/students
// router.route('/').get(getStudents).post(createStudent);

// // /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

