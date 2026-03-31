
import "./login.scss";
import axios  from "axios";
import { useState,useEffect } from "react";
import React, { Component } from "react";
import {Route, useNavigate} from 'react-router-dom';
import { height } from "@mui/system";


const Login=()=> 
{
    const [data, setData] = useState([]);
    const [status,setLoginStatus]=useState("0");
    const [response_back,setresponse]=useState("0");
    const [phone, setphone] = useState("null");
    const [password, setpassword] = useState("null");
    const navigate = useNavigate();
    const handlesubmit =()=> 
   {
    if(phone=="null" || password=="null")
    {
       alert("Please Fill All The Fields!!");
    }
    else{
     axios.post("http://localhost:3001/user/login",{phone: phone,password: password},{withCredentials: true}).then((response) => 
     {
        
          if (!response.data.message)
                    {
                        setLoginStatus("true");
                        navigate("home");
                    } 
          else 
                    {
                        setLoginStatus(false);
                        alert(response.data.message)
                    
                    }     
     });   
    }
   };
    
  return(
    <div className="body">
      <div className="container" id="container">
          <div className="form-container sign-in-container">
              <div className="form">
                    <h1>Login</h1>
                    <input type="number"   placeholder="Phone Number" name="phone"  onChange={(e)=>setphone(e.target.value)} required/>
                    <input type="password" placeholder="Password" name="password"     onChange={(e)=>setpassword(e.target.value)} required/>
                    <button onClick={handlesubmit}> Login </button>
              </div>
          </div>
          <div className="overlay-container">
              <div className="overlay">
                  <div className="overlay-panel overlay-left">
                       <h1>Welcome Back!</h1>
                  </div>
                  <div className="overlay-panel overlay-right">
                      <img src="ezi_logo.png" style={{height: 80, width: 70}}></img>
                  </div>
              </div>
          </div>
     </div>
  </div>
   )
}
export default Login