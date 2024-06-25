const router = require("express").Router();
const welcomePage = require("./welcomePageRoutes");
const apiRoutes = require("./api");

router.use("/", welcomePage);
router.use("/api", apiRoutes);

module.exports = router;
