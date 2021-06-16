import { useState } from "react";

// Material Icon
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import VideoCallIcon from "@material-ui/icons/VideoCall";

// React engine library
import { sendMessage } from "react-chat-engine";

// External CSS
import "./MsgForm.styles.css";

const MsgForm = (props) => {
  const [msg, setMsg] = useState(""); // holds state of input msg
  const { chatId, creds } = props; // credentials of the user required to make a API call

  const handleMeet = () => {
    const text = "meet-chichi";
    sendMessage(creds, chatId, { text});
  }
  // function to update state on writing anything in the msg box
  const handleChange = (event) => {
    setMsg(event.target.value);
  };

  // handle form submition
  const handleSubmit = (event) => {
    event.preventDefault();

    // remmove extra spaces from the msg
    const text = msg.trim();

    // sendMessage is a function provided by react chat engine to send msg in the feed
    if (text.length > 0) {
      sendMessage(creds, chatId, { text }); //call the function with the text
    }

    setMsg(""); // clear the input
  };

  // Function to send any picture 
  const handleAttach= (event) => {
    // while sending a picture sendMessage expect a json object which helps in identifying type of msg

    sendMessage(creds, chatId, { files: event.target.files, text: "" });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={msg}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <ImageIcon className="picture-icon" style={{ color: "#F54748" }} />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleAttach.bind(this)}
      />
      <button className="meet-button">
        <VideoCallIcon
          onClick={() => handleMeet()}
          style={{ color: "#F54748", fontSize: 30, cursor:"pointer" }}
        />
      </button>
      <button type="submit" className="send-button">
        <SendIcon className="send-icon" style={{ color: "#F54748" }} />
      </button>
    </form>
  );
};

export default MsgForm;
