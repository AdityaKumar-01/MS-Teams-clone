// react libraries
import React from "react";

// components
import MyMsg from "../MyMsg/MyMsg.component";
import TheirMsg from "../TheirMsg/TheirMsg.component";
import MsgForm from "../MsgForm/MsgForm.component";
import MeetMsg from "./../MeetMsg/MeetMsg.component";

// External CSS
import "./ChatFeed.styles.css";

const ChatFeed = (props) => {
  // props send by react chat engine
  // cannot alter the name
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat]; // to see we have any chat in the room or not

  // This function will render messages recieved as props
  // check for sender is it same as the currently logged userName or different
  // based on this render 2 different components with their own styling

  const renderMsg = () => {
    const keys = Object.keys(messages); // holds the key for every msg
    return keys.map((key, index) => {
      // create 2 var one for object of meesage and other to format text from msgObj
      var msgObj = messages[key];

      // remove <p> and </p> tag from text
      var conMsg = String(msgObj.text);
      conMsg = conMsg.replace("</p>", "");
      conMsg = conMsg.replace("<p>", "");
      
      const lastMsgKey = index === 0 ? null : keys[index - 1]; // helps the app to find the last message in continuation by the sender
      const isSenderMsg = userName === msgObj.sender.username; // identify the current msg is send by user or what holds boolean value

      const checkMeet = msgObj.text.split("@")[0] === "meet";

      // render messages based on sender
      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          {checkMeet ? (
            <MeetMsg
              msgObj={msgObj}
              isSenderMsg={isSenderMsg}
              chatId={activeChat}
            />
          ) : (
            <div className="message-block">
              {isSenderMsg ? ( // conditional rendering of msg if send by currently logged user float it to right else left
                <MyMsg msgObj={msgObj} conMsg={conMsg} />
              ) : (
                <TheirMsg
                  msgObj={msgObj}
                  lastMessage={messages[lastMsgKey]}
                  conMsg={conMsg}
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
