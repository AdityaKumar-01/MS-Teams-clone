import React, {useContext} from "react";
import {UserContext} from "../../Context/userContext";
import {
  ChatEngineWrapper,
  Socket,
  ChatFeed,
} from "react-chat-engine";


const ChatArea = () => {
  const {name, secret, id} = useContext(UserContext)
  return (
  
    <ChatEngineWrapper>
      <Socket
        projectID="8c36364b-c849-4434-997b-2ba4dd7683d4"
        userName={name}
        userSecret={secret}
      />
      <ChatFeed activeChat={id}/>
    </ChatEngineWrapper>
  );
};

export default ChatArea;
