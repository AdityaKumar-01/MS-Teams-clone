// required NPM packages
const express = require("express");
const router = express.Router();
const axios = require("axios");

//  a function to return a json objects with names of chat
const prepareChatList = (data) => {
  // If no chat room avaiable return 404 and msg
  if (data.length == 0) {
    res = {
      status: 404,
      msg: "New here !!! Create a room and chat",
    };
    return res;
  }

  // If found render over the array of JSON objects to get title
  res = {
    status: 200,
    msg:"Fine",
    names: []
  }
  data.forEach((item) => {
    res.names.push(item.title); // storing titles to chat room
    
  })
  return res;
};
router.get("/getChat", (req, res) => {

  // Header requried to fetch data from Chat room
  const authObject = {
    "Project-ID": "8c36364b-c849-4434-997b-2ba4dd7683d4",
    "User-Name": "aditya",
    "User-Secret": "secret",
  };
  try {
    // Call to get data with header
    axios
      .get("https://api.chatengine.io/chats", {
        headers: authObject,
      })
      .then((data) => {
        res.json(prepareChatList(data.data)); // send JSOn obj return from the function to frontend
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router; // export the module
