// This component is reponsible of chat inside any meet
import React,{useContext} from 'react';

// react chat engine components
import { ChatEngineWrapper, Socket, ChatFeed} from "react-chat-engine";

// context data
import { UserContext } from "../../Context/userContext";

const ChatInMeet = () => {
  const { name, secret, id } = useContext(UserContext);
  return (
    <ChatEngineWrapper>
      <Socket
        projectID={process.env.REACT_APP_PROJECT_ID}
        userName={name}
        userSecret={secret}
        activeChat={id}
      />
      <ChatFeed activeChat={id} />
    </ChatEngineWrapper>
  );
};

export default ChatInMeet;
