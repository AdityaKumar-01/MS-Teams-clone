// react libraries
import React from "react";

// components
import MyMsg from "../MyMsg/MyMsg.component";
import TheirMsg from "../TheirMsg/TheirMsg.component";
import MsgForm from "../MsgForm/MsgForm.component";
import MeetMsg from "./../MeetMsg/MeetMsg.component";

import "./ChatFeed.styles.css";
const ChatFeed = (props) => {
  // props send by react chat engine
  // cannot alter the name
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat]; // to see we have any chat in the room or not

  // render the recipients who has read teh message
  // Only work when user has DP
  const displayRcpt = (message, isSenderMsg) =>
    // map every person in the chat taking their avatar logo
    // chat engine provide a attribute of last_read that tells what was
    // the last msg read by any user in a particular chat room
    chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isSenderMsg ? "right" : "left",
              backgroundImage:
                person.person.avatar && `url(${person.person.avatar})`,
            }}
          />
        )
    );

  // This function will render messages recieved as props
  // check for sender is it same as the currently logged userName or different
  // based on this render 2 different components with their own styling

  const renderMsg = () => {
    const keys = Object.keys(messages); // holds the key for every msg
    return keys.map((key, index) => {
      const message = messages[key];
      const lastMsgKey = index === 0 ? null : keys[index - 1]; // helps the app to find the last message in continuation by the sender
      const isSenderMsg = userName === message.sender.username; // identify the current msg is send by user or what holds boolean value

      const checkMeet = message.text.split("@")[0] === "meet";

      // render messages based on sender
      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          {checkMeet ? (
            <MeetMsg message={message} isSenderMsg = {isSenderMsg}/>
          ) : (
            <div className="message-block">
              {isSenderMsg ? ( // conditional rendering of msg if send by currently logged user float it to right else left
                <MyMsg message={message} />
              ) : (
                <TheirMsg
                  message={message}
                  lastMessage={messages[lastMsgKey]}
                />
              )}
            </div>
          )}
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="chatFeed">
      <div className="chatTitleContainer">
        <div className="chatTitle">{chat?.title}</div>
      </div>
      {renderMsg()}
      <div style={{ height: "100px" }} />
      <div className="messageFormContainer">
        <MsgForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
