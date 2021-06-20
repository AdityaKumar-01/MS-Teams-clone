import React from 'react';

// utility libraries
import Avatar from "react-avatar";
const TheirMsg = ({ lastMessage, msgObj, conMsg }) => {
  // if it was not the last msg and the sender is not the user currently logged in
  const isFirstMsgByUser =
    !lastMessage || lastMessage.sender.username !== msgObj.sender.username;

  return (
    <div className="message-row">
      {isFirstMsgByUser && ( // checks the message is the first message by sender then display its avatar
        <div
          className="message-avatar"
          style={{
            backgroundImage: msgObj.sender && `url(${msgObj.sender.avatar})`,
          }}
        >
          <Avatar name={msgObj.sender.username} size="45" round={true} />
        </div>
      )}
      {msgObj.attachments && msgObj.attachments.length > 0 ? ( // if the message is an attachment then display the img
        <img
          src={msgObj.attachments[0].file}
          alt="message-attachment"
          className="message-image"
          style={{ marginLeft: isFirstMsgByUser ? "4px" : "48px" }}
        />
      ) : (
        <div
          className="message"
          style={{
            float: "left",
            backgroundColor: "#F54748",
            color: "black",
            marginLeft: isFirstMsgByUser ? "4px" : "8px", // if the avatar is to be displayed then give more margin on left
          }}
        >
          <span className="sender-name">
            <em>{msgObj.sender.username}</em>
          </span>
          <span className="sender-text">{conMsg}</span>
        </div>
      )}
    </div>
  );
};

export default TheirMsg;
