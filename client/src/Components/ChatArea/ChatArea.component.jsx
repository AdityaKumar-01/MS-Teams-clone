import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { ChatEngine,} from "react-chat-engine";

import "./ChatArea.styles.css";
import "./ChatArea.essential.styles.css";
import ChatFeed from './../ChatFeed/ChatFeed.component';

const ChatArea = () => {
  const { id } = useContext(UserContext);
  
  console.log(localStorage.getItem("password"));
  return (
    <ChatEngine
      height="100vh"
      projectID="8c36364b-c849-4434-997b-2ba4dd7683d4"
      userName={localStorage.getItem("userName")}
      userSecret={localStorage.getItem("password")}
      activeChat={id}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
};

export default ChatArea;
