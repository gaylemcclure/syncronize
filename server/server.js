const express = require('express');
const app = express();
const port = 5001;

app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"] })
});

app.listen(port, () => console.log("server started on port 5001"));