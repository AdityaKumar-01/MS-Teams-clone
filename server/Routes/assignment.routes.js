// required NPM packages
const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const assignment = require("../Models/assignment.js");

router.post("/create", (req, res) => {
  const assignmentObj = new assignment({
    assignmentId: req.body.id,
    creator: req.body.creator,
    title: req.body.title,
    dueDate: req.body.date,
    dueTime: req.body.time,
    formLink: req.body.formLink,
    assigneesName: req.body.assigneesName,
    assignmentInstructions: req.body.assignmentInstructions,
  });
  assignmentObj.save(); // save the data
  res.send({status:200, msg:"created"})
});

router.get("/getAssignment", (req,res) => {
  console.log("here in backend");
  assignment.find({}, (err, data) => {
    console.log(data);
    res.send({ status: 200, list:data});
  })
})
module.exports = router; // export the module
