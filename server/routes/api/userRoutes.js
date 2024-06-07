const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({"users": ["userOne", "userTwo", "userThree"]})
})


module.exports = router;