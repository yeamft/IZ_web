import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import {useParams} from 'react-router-dom';

import { useState,useEffect } from "react";
import axios from "axios";
const Single = () => {
  const { userid } = useParams("");
  const [data_user,setData]=useState([]);
  useEffect(()=> {
      axios.post("http://localhost:3001/users/byid",{userid: userid}).then((response) =>{
setData(response.data[0]);

      })
    
  
    }, [])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="http://localhost:3000/user.png"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data_user.full_name}</h1>
                
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data_user.phone_number}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {data_user.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data_user.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data_user.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sub city:</span>
                  <span className="itemValue">{data_user.subcity}</span>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default Single;