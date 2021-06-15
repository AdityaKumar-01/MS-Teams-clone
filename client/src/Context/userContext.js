// React libraries
import React,{ useState} from 'react';

// USerContext that will help to fetch values
const UserContext = React.createContext();

// UserProvider react item to deliver all values 
// Provider contains all the states and funcions which can be required by other components

const UserProvider = ({children}) =>{
    const [name, setName] = useState("");
    const [secret, setSecret] = useState("");
    const [id, setId] = useState(0);
    
    const setUserName = (name) => {
        setName(name);
    }
    const setPwd= (pwd) => {
      setSecret(pwd);
    };
    const setRoomId= (roomId) => {
      setId(roomId);
    };
    // values holds functions and states to be shared
    const value = { setUserName, setPwd, setRoomId, name, secret, id };
    return(
        <UserContext.Provider
         value={value}>
            {children}
        </UserContext.Provider>
    )
}
// export both context and provider
// Context are required by components to fetch data
// Provider is reponsible to tell the react app that we are using context API 
export { UserContext , UserProvider};