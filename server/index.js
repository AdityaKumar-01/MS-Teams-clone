// Required NPM packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

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
app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes module to handle any activity related to chat
const chatRoute = require("./Routes/chat.routes");
app.use("/chat", chatRoute);

// Routes module to handle any activity related to user
const userRoute = require("./Routes/user.routes");
app.use("/user", userRoute);

// Routes module to handle any activity related to meet
const videoRoute = require("./Routes/video.routes");
app.use("/video", videoRoute);

// Routes module to handle any activity related to assignment
const assignmentRoute = require("./Routes/assignment.routes");
app.use("/assignment", assignmentRoute);

// Routes module to handle any activity related to mail
const mailRoute = require("./Routes/mail.routes");
app.use("/mail", mailRoute);

// route to test working of backend
app.get("/", (req, res) => {
  res.send("Backend for MS teams clone");
});

// Server to run express app
app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("server started");
});
