const router = require("express").Router();

router.use((req, res, next) => {
  console.log("get the request related to auth");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("connect to auth route...");
});

module.exports = router;
