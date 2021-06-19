import React from 'react';
import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";
const ChatInMeet = () => {
  return (
    <div>
      <ChatEngineWrapper>
        <Socket
          projectID={process.env.REACT_APP_PROJECT_ID}
          // get userName and password from local storage to avoid vanishing of states on page reload
          userName={localStorage.getItem("userName")}
          userSecret={localStorage.getItem("password")}
          activeChat={localStorage.getItem("chatId")}
        />

        {/* Everything else... */}
        <ChatFeed activeChat={localStorage.getItem("chatId")} />
      </ChatEngineWrapper>
    </div>
  );
};

export default ChatInMeet;
