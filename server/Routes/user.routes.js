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
  user.countDocuments({ userName: req.body.name}, (err, c) => {
    // if you get 0 documents then no user exist with same name
    if (c == 0) {
      // Create user obj to save in data abse with the data entered in the form
      //  req.body will get the data recieved in the API call by frontend
      const userObj = new user({
        email: req.body.email,
        userName: req.body.name,
        password: sha256(req.body.password),
      });
      userObj.save(); // save the data

      // body to be send to chat engine in order to sync with our database
      var data = {
        username: req.body.name,
        secret: req.body.password,
      };

      // config object with API call methid and header
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
          // localStorage.setItem("username", username);
          // localStorage.setItem("password", password);
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

module.exports = router // export the module