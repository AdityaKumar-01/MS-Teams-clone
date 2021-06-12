const express = require("express");
const router = express.Router();
const user = require("../Models/user");
const sha256 = require("sha256");

router.post("/signUp", (req, res) => {
  console.log(req.body.email)
  const userObj = new user({
    email: req.body.email,
    userName: req.body.name,
    password: sha256(req.body.password),
  });
  userObj.save();
  res.send("cool");
});

module.exports = router