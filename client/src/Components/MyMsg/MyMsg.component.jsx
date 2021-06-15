import React from 'react';

const MyMsg = ({ message }) => {
  if (message.attachments && message.attachments.length > 0) {
    return (
      <img
        src={message.attachments[0].file} // send the message as a image`
        alt="message-attachment"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }

  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",
      }}
    >
      {message.text}
    </div>
  );
};

export default MyMsg;
