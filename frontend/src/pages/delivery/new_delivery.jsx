import "./new_delivery.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios  from "axios";

const New_delivery = () => {
  
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [phone, setphone] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const [longtuide, setlongtuide] = useState("");
  const [latitude, setlatitude] = useState("");
  const [address, setaddress] = useState("");
 
const senddata =()=> {

  axios.post("https://iz-web.onrender.com/delivery/new",{firstname: firstname,lastname: lastname,middlename: middlename,phone: phone,userpassword: userpassword,user_password: userpassword,longtuide: longtuide,latitude: latitude,address:address}).then(()=> alert("sucess"));
};
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>New Delivery</h1>
        </div>
        <div className="bottom">
          <div className="left">
           
          </div>
          <div className="right">
            <form>
              <div className="formInput">
               
                 <label>First Name</label>
                  <input type="text"  onChange={(e)=>
                  {
                    setfirstname(e.target.value);
                  }
                  } required/>
                   <label>Middle Name</label>
                  <input type="text"  onChange={(e)=>
                  {
                    setmiddlename(e.target.value);
                  }
                  } required/>
                   <label>Last Name</label>
                  <input type="text" onChange={(e)=>
                  {
                    setlastname(e.target.value);
                  }
                  } required/>
                  <label>Address</label>
                  <input type="text" placeholder= "Address" onChange={(e)=>
                  {
                    setaddress(e.target.value);
                  }} required/>
                  <label>Longtuide</label>
                  <input type="number" placeholder= "longtuide" onChange={(e)=>
                  {
                    setlongtuide(e.target.value);
                  }} required/>
                  <label>Latitude</label>
                  <input type="number" placeholder= "latitude" onChange={(e)=>
                  {
                    setlatitude(e.target.value);
                  }} required/>
                 
                  <label>Phone Number</label>
                  <input type="number"  onChange={(e)=>
                  {
                    setphone(e.target.value);
                  }} required/>
               <label>Password</label>
                  <input type="password" onChange={(e)=>
                  {
                    setuserpassword(e.target.value);
                  }
                  } required/>
              </div>
              
               
              <button onClick={senddata}>Register</button>
            </form>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default New_delivery;
