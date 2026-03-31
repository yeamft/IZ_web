import "./suppliers.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import {useParams} from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";

const Viewsupplier = () => {
        const { userid } = useParams(" ");
    
        const [data_user,setData]=useState([]);
        useEffect(()=> {
            axios.post("https://iz-web.onrender.com/supplier/view",{userid: userid}).then((response) =>{
setData(response.data[0]);

            } )
          
        
          }, [])
    

    
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
        
            <h1 className="title">Information</h1>
            <h1 className="title"></h1>
            <div className="item">
                
              <img
                src={"http://localhost/"+data_user.image_path}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data_user.business_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Bussiness Owner Name:</span>
                  <span className="itemValue">{data_user.bussiness_owner_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Company Registration Number</span>
                  <span className="itemValue">{data_user.company_registration_number}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">
                  {data_user.country}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data_user.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sub City:</span>
                  <span className="itemValue">{data_user.subcity}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{data_user.status}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone Number:</span>
                  <span className="itemValue">{data_user.phone_number}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tin Number:</span>
                  <span className="itemValue">{data_user.tin_number}</span>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default Viewsupplier;
