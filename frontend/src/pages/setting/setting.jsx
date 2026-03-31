import "./setting.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState,useEffect } from "react";
import axios  from "axios";

const Setting = () => {
  
  // axios.post("https://iz-web.onrender.com/businesstype",{type_name: e.target.business_type_name.value}).then(()=> alert("sucess"));
  const [data_user,setData]=useState([]);
  const [distance,setdistance]=useState();
  useEffect(()=> {
    fetch("https://iz-web.onrender.com/distance").then((data) => data.json())
    .then((data) => setData(data))
     setdistance(data_user);
    
  },[])
  
  const update_distance= ()=> {
 axios.post("https://iz-web.onrender.com/distance/update",{distance: distance}).then(()=> alert("sucess"),window.location.reload(false));
  }
    return (
        <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>Setting</h1>
          </div>
    
            
              <form onSubmit={update_distance}>
                <div className="formInput" >
                   <label>Distance(in KM)</label>
                    <input type="text" className="distance" defaultValue={data_user} onChange={(e)=> setdistance(e.target.value)} required/>
                  </div>
               
                <button type="submit" >Save</button>
              </form>
            </div>
          
          </div>
    
    
  );
};

export default Setting;
