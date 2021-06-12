
const express = require('express');
const router = express.Router();
const axios = require('axios');
router.get("/get", (req, res) => {
  const authObject = {
    "Project-ID": "8c36364b-c849-4434-997b-2ba4dd7683d4",
    "User-Name": "aryman",
    "User-Secret": "secret",
  };
  try {
    axios
      .get("https://api.chatengine.io/chats", {
        headers: authObject,
      })
      .then((data) => {
        console.log(data.data[0].title);
      })
      .catch((err) => {
        console.log("no chats");
      });
  } catch (err) {
    console.log(err);
  }
  res.send("cool");
});

module.exports = router;