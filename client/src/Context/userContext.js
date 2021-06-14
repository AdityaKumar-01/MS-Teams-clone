import React,{ useState} from 'react';

const UserContext = React.createContext();


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
    const value = { setUserName, setPwd, setRoomId, name, secret, id };
    return(
        <UserContext.Provider
         value={value}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext , UserProvider};