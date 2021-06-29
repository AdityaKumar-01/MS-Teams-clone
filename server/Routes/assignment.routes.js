// required NPM packages
const express = require("express");
const router = express.Router();

const assignment = require("../Models/assignment.js");
const user = require("../Models/user.js");

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
      timeStamp: obj.timeStamp,
    };
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

const formatDate = () => {
  const currentDate = new Date(); // get current date and time

  const currentDay = currentDate.getDate(); // get day from date obj
  const currentMonth = currentDate.getMonth() + 1; // get month from date obj
  const currentHr = currentDate.getHours(); // get hour from date obj
  const currentMin = currentDate.getMinutes(); // get minute from date obj

  const formattedDate = `${currentDay}-${currentMonth} ${currentHr}:${currentMin}`;

  return formattedDate;
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
      {
        $push: {
          assignments: { id: uid, turnedIn: false, timeStamp: formatDate() },
        },
      },
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

  res.send({ status: 200, list: assgnList });
});

router.get("/getAssignmentDetails", (req, res) => {
  assignment.find({ assignmentId: req.query.id }, (err, data) => {
    res.send({ status: 200, list: data[0] });
  });
});

router.post("/turnInAssignment", async (req, res) => {
  userDoc = await user.find({ userName: req.body.userName });
  updateAsgn = userDoc[0].assignments.map((asgnObj) => {
    if (asgnObj.id === req.body.id) {
      asgnObj.timeStamp = formatDate();
      asgnObj.turnedIn = true;
    }
    return asgnObj;
  });
  await user.findOneAndUpdate(
    { userName: req.body.userName },
    { assignments: updateAsgn }
  );
  res.send({ status: 200 });
});

const prepareStatus = async (data, name, id) => {
  info = await data.map((asgnObj) => {
    if (id === asgnObj.id) {
      console.log("true");
      return {
        name: name,
        status: asgnObj.turnedIn,
        timeStamp: asgnObj.timeStamp,
      };
    }
  });
  return info;
};
const formatData = (data) => {
  console.log(data);
  var info = []
  data.forEach(obj =>{
    info.push(obj[0]);
  })
  return info;
}
router.get("/assignmentStatus", async (req, res) => {
  console.log(req.query.asgineesName);
  info = await Promise.all(
    req.query.asgineesName.map(async (name) => {
      userDoc = await user.find({ userName: name });
      return prepareStatus(userDoc[0].assignments, name, req.query.id)
    })
  );
  console.log("done");
  info = formatData(info);
  res.json({ info: info});
});
module.exports = router; // export the module
