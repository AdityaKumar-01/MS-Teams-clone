import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import queryString from "query-string";
const DisplayAssignment = () => {

    let history = useHistory();
    useEffect(() => {
      const { id} = queryString.parse(
        history.location.search
      );

      console.log(id);
    }, [history.location.search]);
    
    return (
        <div>
            
        </div>
    )
}

export default DisplayAssignment
