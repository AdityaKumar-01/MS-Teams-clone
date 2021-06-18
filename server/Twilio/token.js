// twilio npm package
const twilio = require("twilio");

// jwt from twilio for sessions
const AccessToken = twilio.jwt.AccessToken;

// video grant component by twilio which grants us the video of users
const { VideoGrant } = AccessToken;

// generating token from config
const generateToken = (config) => {
  return new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );
};

// Send video token to user to join meet
const vidTkn = (id, room, cnfg) => {
  let vidGrant;
  if (typeof room !== "undefined") { // if room is defined generate for that room 
    vidGrant = new VideoGrant({ room });
  } else {
    vidGrant = new VideoGrant();
  }
  const token = generateToken(cnfg);
  token.addGrant(vidGrant);
  token.identity = id;
  return token;
};

module.exports = { vidTkn };
