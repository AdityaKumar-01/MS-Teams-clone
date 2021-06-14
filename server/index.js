// Required NPM packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Routes module to handle any activity related to chat 
const chatRoute = require("./Routes/chat.routes");
app.use("/chat", chatRoute);

// Routes module to handle any activity related to chat
const userRoute = require("./Routes/user.routes");
app.use("/user", userRoute);

app.get("/", (req, res) => {
  
   const authObject = {
     "Project-ID": "8c36364b-c849-4434-997b-2ba4dd7683d4",
     "User-Name":"aditya",
     "User-Secret": "aditya123",
   };
   try {
     // Call to get data with header
     axios
       .get(
         "https://api.chatengine.io/chats/31827/messages/latest/210/",
         {
           headers: authObject,
         }
       )
       .then((data) => {
         console.log(data); // send JSON obj return from the function to frontend
       })
       .catch((err) => {
         console.log(err);
       });
   } catch (err) {
     console.log(err);
   }
})
// Server to run express app
app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("server started");
});
