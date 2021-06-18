// required NPM packages
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Config file for twilio to make API calls
const config = require("../Twilio/config");

// get token whenever a user joins a meet
const { vidTkn } = require("../Twilio/token");

// send a json obj with token for current user
const sendTknRes= (token, res) => {
  res.set("Content-type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};

// // request for a token
// router.get("/token", (req, res) => {
//   const identity = req.query.identity;
//   const room = req.query.room;
//   const token = vidTkn(identity, room, config);
//   sendTknRes(token, res);
// });

// for joining a room
router.post("/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = vidTkn(identity, room, config); // send the token recieved from API 
  sendTknRes(token, res);
});

module.exports = router; // export the module