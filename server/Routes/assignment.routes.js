// required NPM packages
const express = require("express");
const router = express.Router();

const assignment = require("../Models/assignment.js");
const user = require("../Models/user.js");

const prepareAssignment =  (data) => {
  var assgnList = [];
   data.forEach((obj) => {
    asgnObj = assignment.find({ assignmentId: obj.id });
    console.log("====================================");
    console.log("====================================");
    console.log("====================================");
    console.log("====================================");
    console.log(asgnObj);
    // var element = {
    //   assignmentId: asgnObj[0].assignmentId,
    //   creator: asgnObj[0].creator,
    //   title: asgnObj[0].title,
    //   dueDate: asgnObj[0].dueDate,
    //   dueTime: asgnObj[0].dueTime,
    //   turnedIn: obj.turnedIn,
    // };
    // console.log("element");
    // console.log(element);
    // assgnList.push(element);
  });
  console.log("list");
  console.log(assgnList);
  return assgnList;
};
router.post("/create", (req, res) => {
  const assignees = req.body.assigneesName;
  const uid = req.body.id;
  const creator = req.body.creator;
  const assignmentObj = new assignment({
    assignmentId: uid,
    creator: creator,
    title: req.body.title,
    dueDate: req.body.date,
    dueTime: req.body.time,
    formLink: req.body.formLink,
    assigneesName: assignees,
    assignmentInstructions: req.body.assignmentInstructions,
  });
  assignmentObj.save(); // save the data
  assignees.push(creator);
  assignees.forEach((obj) => {
    user.findOneAndUpdate(
      { userName: obj },
      { $push: { assignments: { id: uid, turnedIn: false } } },
      (err, status) => {
        console.log(err, status);
      }
    );
  });
  res.send({ status: 200, msg: "created" });
});

router.get("/getAssignment", (req, res) => {
  console.log("here in backend ", req.query.userName);
  user.find({ userName: req.query.userName }, (err, data) => {
    // console.log(data[0].assignments);
    var assgnList = prepareAssignment(data[0].assignments);
    res.send({ status: 200, list: assgnList });
  });
});

router.get("/getAssignmentDetails", (req, res) => {
  console.log("here in backend ", req.query.id);
  assignment.find({ assignmentId: req.query.id }, (err, data) => {
    // console.log(data[0].assignments);
    // var assgnList = prepareAssignment(data[0].assignments);
    res.send({ status: 200, list: data[0] });
  });
});
module.exports = router; // export the module
