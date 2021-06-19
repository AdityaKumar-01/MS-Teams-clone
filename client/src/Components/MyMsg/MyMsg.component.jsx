import React from 'react';

const MyMsg = ({ msgObj, conMsg }) => {
  if (msgObj.attachments && msgObj.attachments.length > 0) {
    return (
      <img
        src={msgObj.attachments[0].file} // send the message as a image`
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
      {conMsg}
    </div>
  );
};

export default MyMsg;
