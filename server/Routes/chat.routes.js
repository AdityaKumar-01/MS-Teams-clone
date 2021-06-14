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
    info: []
  }
  data.forEach((item) => {
    res.info.push({"title":item.title, "id": item.id}); // storing titles to chat room
    // console.log(item.title, item.id);    
  })
  return res;
};
router.post("/getChat", (req, res) => {
  // Header requried to fetch data from Chat room
  const authObject = {
    "Project-ID": "8c36364b-c849-4434-997b-2ba4dd7683d4",
    "User-Name": req.body.name,
    "User-Secret": req.body.password,
  };
  try {
    // Call to get data with header
    axios
      .get("https://api.chatengine.io/chats", {
        headers: authObject,
      })
      .then((data) => {
        console.log(data.data);
        res.json(prepareChatList(data.data)); // send JSON obj return from the function to frontend
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});


router.post("/createChat", (req, res) => {
  
  const authObject = {
    "Project-ID": "8c36364b-c849-4434-997b-2ba4dd7683d4",
    "User-Name": req.body.name,
    "User-Secret": req.body.password,
  };
  // Header requried to fetch data from Chat room
  var data = {
    "title": req.body.title,    
  };

  // config object with API call methid and header
  var config = {
    method: "post",
    url: "https://api.chatengine.io/chats/",
    headers: authObject,
    data: data,
  };

  // Make the call
  axios(config)
    .then(function (response) {
      // Notify the frontend that the chat is being created
      res.json({ status: 201, msg: "Team Created Successfully" });
    })
    .catch(function (error) {
      console.log(error);
      // if any error occurred send 400 status and error msg to be displayd
      res.json({ status: 400, msg: "Cannot Create Team" });
    });
});
module.exports = router; // export the module
