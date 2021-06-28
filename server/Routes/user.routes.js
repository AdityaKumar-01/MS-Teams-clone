// Reuired NPM packages
const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const axios = require("axios");

// dot env to get private api keys
const dotenv = require("dotenv");
dotenv.config();

// Mongoose model for user details
const user = require("../Models/user");

router.post("/signUp", (req, res) => {
  // check user exist with same username or not
  user.countDocuments({ userName: req.body.name }, (err, c) => {
    // if you get 0 documents then no user exist with same name
    if (c == 0) {
      // Create user obj to save in data abse with the data entered in the form
      //  req.body will get the data recieved in the API call by frontend
      const userObj = new user({
        email: req.body.email,
        userName: req.body.name,
        password: sha256(req.body.password),
        assignments:[]
      });
      userObj.save(); // save the data

      // body to be send to chat engine in order to sync with our database
      var data = {
        username: req.body.name,
        secret: req.body.password,
      };

      // config object with API call method and header
      var config = {
        method: "post",
        url: "https://api.chatengine.io/users/",
        headers: {
          "PRIVATE-KEY": process.env.CHAT_ENGINE_API_KEY, // header needs to have the private key provided by chat engine
        },
        data: data,
      };

      // Make the call
      axios(config)
        .then(function (response) {
          // Notify the frontend that the user is being created
          res.json({ status: 201, msg: "User Created successfully" });
        })
        .catch(function (error) {
          console.log(error);

          // if any error occurred send 400 status and error msg to be displayd
          res.json({ status: 400, msg: "User Already Exists" });
        });
    } else res.json({ status: 400, msg: "User Already Exists" }); // if any error occurred send 400 status and error msg to be displayd
  });
});

router.post("/signIn", (req, res) => {
  // check user exist with same username or not

  user.find({ userName: req.body.name }, (err, data) => {
    // if you get 1 document then there exist a user with this name
    if (data.length >= 1 && sha256(req.body.password) === data[0].password) {
      // Notify the frontend that the user is signedIn
      res.json({ status: 201, msg: "User Found" });
    } else res.json({ status: 404, msg: "Check your credentials" }); // if any error occurred send 404 status and error msg to be displayd
  });
});

router.post("/updateUserName", (req, res) => {
  user.find({ userName: req.body.newName }, (err, data) => {
    if (data.length >= 1) res.json({ status: 403, msg: "User name taken" });
    else {
      var data = {
        username: req.body.newName,
      };
      const filter = { userName: req.body.name };
      const update = { userName: req.body.newName };
      user.findOneAndUpdate(filter, update, (err, doc) => {});
      // config object with API call meth0d and header

      var config = {
        method: "patch",
        url: "https://api.chatengine.io/users/me/",
        headers: {
          "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
          "User-Name": req.body.name,
          "User-Secret": req.body.password,
        },
        data: data,
      };

      // Make the call
      axios(config)
        .then(function (response) {
          // Notify the frontend that the user is being created
          res.json({ status: 200, msg: "User name updated" });
        })
        .catch(function (error) {
          // if any error occurred send 400 status and error msg to be displayd
          // res.json({ status: 403, msg: "User Already Exists" });
          console.log(error);
        });
    }
  });
});

router.post("/updateUserPwd", (req, res) => {
  var data = {
    "user-secret": req.body.newPwd,
  };
  const filter = { userName: req.body.name };
  const update = { password: sha256(req.body.newPwd) };
  user.findOneAndUpdate(filter, update, (err, doc) => {console.log(err);});
  // config object with API call meth0d and header

  var config = {
    method: "patch",
    url: "https://api.chatengine.io/users/me/",
    headers: {
      "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
      "User-Name": req.body.name,
      "User-Secret": req.body.password,
    },
    data: data,
  };

  // Make the call
  axios(config)
    .then(function (response) {
      // Notify the frontend that the user is being created
      res.json({ status: 200, msg: "Password updated" });
    })
    .catch(function (error) {
      // if any error occurred send 400 status and error msg to be displayd
      // res.json({ status: 403, msg: "User Already Exists" });
      console.log(error);
    });
});

module.exports = router; // export the module
