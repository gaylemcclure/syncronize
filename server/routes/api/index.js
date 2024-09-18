const router = require("express").Router();
const userRoute = require('./userRoutes');
const projectRoutes = require("./projectRoutes");
const stripeRoutes = require("./stripeRoutes")
const mailRoutes = require("./mailRoutes");

router.use('/users', userRoute);
router.use("/project", projectRoutes);
router.use("/stripe", stripeRoutes);
router.use("/mail", mailRoutes)


module.exports = router;

