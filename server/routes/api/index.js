const router = require("express").Router();
const userRoute = require('./userRoutes');
// const taskRoutes = require("./taskRoutes");
const projectRoutes = require("./projectRoutes");
const stripeRoutes = require("./stripeRoutes")

router.use('/users', userRoute);
router.use("/project", projectRoutes);
router.use("/stripe", stripeRoutes);
// router.use("/session-status", stripeRoutes);


module.exports = router;

