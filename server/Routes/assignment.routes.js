// required NPM packages
const express = require("express");
const router = express.Router();

const assignment = require("../Models/assignment.js");
const user = require("../Models/user.js");

const demo = async (obj) => {
  asgnObj = await assignment.find({ assignmentId: obj.id });
  if (asgnObj[0]) {
    var element = {
      assignmentId: asgnObj[0].assignmentId,
      creator: asgnObj[0].creator,
      title: asgnObj[0].title,
      dueDate: asgnObj[0].dueDate,
      dueTime: asgnObj[0].dueTime,
      turnedIn: obj.turnedIn,
    };
    return element;
  }

  return null;
};

// const prepareAssignment = async (data) => {
//   assgnList = await Promise.all(
//     data.map(async (obj) => {
//       element = await demo(obj);
//       return element;
//     })
//   );
//   console.log("assgnList inside prepare function");
//   console.log(assgnList);
//   return assgnList;
// };
const assignmentInfo = async (obj) => {
  asgnObj = await assignment.find({ assignmentId: obj.id });
  if (asgnObj[0]) {
    var element = {
      assignmentId: asgnObj[0].assignmentId,
      creator: asgnObj[0].creator,
      title: asgnObj[0].title,
      dueDate: asgnObj[0].dueDate,
      dueTime: asgnObj[0].dueTime,
      turnedIn: obj.turnedIn,
    };
    console.log("here in info");
    console.log(element);
    return element;
  }

  return null;
};
const prepareAssignment = async (data) => {
  assgnList = await Promise.all(
    data.map(async (obj) => {
      element = await assignmentInfo(obj);
      return element;
    })
  );

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

router.get("/getAssignment", async (req, res) => {
  var assgnList = [];
  assgnList = await user.find({ userName: req.query.userName });
  assgnList = await prepareAssignment(assgnList[0].assignments);
  console.log("here in route");
  console.log(assgnList);
  
  res.send({ status: 200, list: assgnList });
});

router.get("/getAssignmentDetails", (req, res) => {
  assignment.find({ assignmentId: req.query.id }, (err, data) => {
    res.send({ status: 200, list: data[0] });
  });
});
module.exports = router; // export the module
