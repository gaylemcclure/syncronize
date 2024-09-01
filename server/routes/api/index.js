const router = require("express").Router();
const userRoute = require('./userRoutes');
const projectRoutes = require("./projectRoutes");
const stripeRoutes = require("./stripeRoutes")

router.use('/users', userRoute);
router.use("/project", projectRoutes);
router.use("/stripe", stripeRoutes);


module.exports = router;

