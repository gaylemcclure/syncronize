const router = require("express").Router();
const { getAllUsers, getUserById, createUser } = require('../../controller/userController');



router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById)


module.exports = router;




//Get user by id
//Get user by name
//Create new user
//Update user
//Delete user