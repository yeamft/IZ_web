import { Navigate } from "react-router-dom";
import { useState ,useEffect} from "react";
function Auth({ nextpage })
{  
    const [status,setLoginStatus]=useState("");
    useEffect(() => {
        fetch("https://iz-web.onrender.com/user/login",{withCredentials: true})
          .then((res) => res.json())
          .then((data) => {
           setLoginStatus(data.loggedIn)
          });
      }, [])
      
      if(status)
      {
        return nextpage;
      }
      else
      {
        return <Navigate to="/"/>;
      }
}
export default Auth;
