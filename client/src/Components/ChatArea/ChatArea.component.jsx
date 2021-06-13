import React from "react";

import {
  ChatEngineWrapper,
  Socket,
  ChatFeed,
} from "react-chat-engine";

const ChatArea = () => {
  return (
    <ChatEngineWrapper>
      <Socket
        projectID="8c36364b-c849-4434-997b-2ba4dd7683d4"
        userName="aditya"
        userSecret="aditya123"
      />
      <ChatFeed activeChat={31827} />
    </ChatEngineWrapper>
  );
};

export default ChatArea;
