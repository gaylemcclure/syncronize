const router = require("express").Router();

// render login page
router.get("/", async (req, res) => {
    try {
        console.log(res)
    } catch (error) {
        res.status(500).json(error);
    }
});

// module.exports = router;

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

