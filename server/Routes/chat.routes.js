// required NPM packages
const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

//  a function to return a json objects with names of chat
const prepareChatList = (data, isDM) => {
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
    msg: "Fine",
    info: [],
  };
  if (isDM) {
    data.forEach((item) => {
      if (item.is_direct_chat)
        item.people.forEach((pObj) => {
          res.info.push({ title: pObj.person.username, id: 000 });
        });
    });
  } else {
    data.forEach((item) => {
      if (!item.is_direct_chat)
        res.info.push({ title: item.title, id: item.id }); // storing titles to chat room
    });
  }
  if(isDM)
    res.info =[...new Set(res.info)];
  return res;
};

router.post("/getChat", (req, res) => {
  // Header requried to fetch data from Chat room
  const isDM = req.body.isDM;

  const authObject = {
    "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
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
        res.json(prepareChatList(data.data, isDM)); // send JSON obj return from the function to frontend
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/createChat", (req, res) => {
  const isDM = req.body.isDM;
  const userNames = [req.body.userName, req.body.name];
  const authObject = {
    "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
    "User-Name": req.body.name,
    "User-Secret": req.body.password,
  };
  // Header requried to fetch data from Chat room
  if (isDM) {
    var data = {
      usernames: userNames,
      is_direct_chat: true,
    };
  } else {
    var data = {
      title: req.body.title,
    };
  }

  // config object with API call methid and header
  var config = {
    method: isDM ? "put" : "post",
    url: "https://api.chatengine.io/chats/",
    headers: authObject,
    data: data,
  };

  // Make the call
  axios(config)
    .then(function (response) {
      console.log(response.status);
      isDM
        ? res.json({
            status: 201,
            msg: "DM Created Successfully",
            isDM: true,
          })
        : res.json({
            status: 201,
            msg: "Team Created Successfully",
            isDM: false,
          });
      // Notify the frontend that the chat is being created
    })
    .catch(function (error) {
      console.log("error");
      // if any error occurred send 400 status and error msg to be displayd
      res.json({
        status: 400,
        msg: isDM ? "Check UserName" : "Cannot Create Team",
        isDM: isDM,
      });
    });
});

module.exports = router; // export the module
