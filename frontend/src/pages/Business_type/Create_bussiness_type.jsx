import "./create.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios  from "axios";

const Create_bussiness_type = () => {
  const create_type = (e) => {
   axios.post("http://localhost:3001/businesstype",{type_name: e.target.business_type_name.value,type_name_amh: e.target.business_type_name_amh.value})
   .then((response) => {
    alert("successfull!!");
  })
}
    return (
        <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>New Business Type</h1>
          </div>
    
            
              <form onSubmit={create_type}>
                <div className="formInput" >
                   <label>Business Type Name</label>
                    <input type="text" name="business_type_name" placeholder= "Business Type Name" required/>
                    <label>Business Type Name Amharic</label>
                    <input type="text" name="business_type_name_amh" placeholder= "Business Type Name Amharic" required/>
                   
                   
                  </div>
               
                <button type="submit" >Save</button>
              </form>
            </div>
          
          </div>
    
    
  );
};

export default Create_bussiness_type;