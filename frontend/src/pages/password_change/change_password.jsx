import "./change_password.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState,useEffect } from "react";
import axios  from "axios";

const Password_change = () => {
  
  // axios.post("https://iz-web.onrender.com/businesstype",{type_name: e.target.business_type_name.value}).then(()=> alert("sucess"));
 
  const [new_password,set_new_password]=useState();
 
  
  const change_password= ()=> {
 axios.post("https://iz-web.onrender.com/change_password",{password: new_password}).then(()=> alert("sucess"),window.location.reload(false));
  }
    return (
        <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>Change Password</h1>
          </div>
              <form onSubmit={change_password}>
                <div className="formInput" >
                   <label>New Password</label>
                    <input type="password" className="new_password"  onChange={(e)=> set_new_password(e.target.value)} required/>
                  </div>
               
                <button type="submit" >Save</button>
              </form>
            </div>
          
          </div>
    
    
  );
};

export default Password_change;
