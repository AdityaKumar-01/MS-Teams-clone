// Required NPM packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./Twilio/config");
const { videoToken } = require("./Twilio/token");
// get env file that posses private keys
const dotenv = require("dotenv");
dotenv.config();

// connect Mongo Atlas
const DB = process.env.MONGO_URL; // URL string to connect DB
// call the Mongo Atlas for connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connections successful"))
  .catch((err) => console.log(err));

// create app from express
const app = express();

// Cors config in order to remove any error while deployment
app.use(cors());
// app.use(express.json());

// Routes module to handle any activity related to chat



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const sendTokenResponse = (token, res) => {
  res.set("Content-type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};
app.get("/greeting", (req, res) => {
 
  const name = req.query.name || "world";
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify({ greeting: `hello ${name} !` }));
});

app.get("/video/token", (req, res) => {
 
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.post("/video/token", (req, res) => {
  
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

const chatRoute = require("./Routes/chat.routes");
app.use("/chat", chatRoute);

// Routes module to handle any activity related to chat
const userRoute = require("./Routes/user.routes");
app.use("/user", userRoute);

// Server to run express app
app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("server started");
});
