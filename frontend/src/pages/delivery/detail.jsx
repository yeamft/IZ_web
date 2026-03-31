import "./detail.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import {useParams} from 'react-router-dom';

import { useState,useEffect } from "react";
import axios from "axios";
const Detail = () => {
  const { userid } = useParams("");
  const [data_user,setData]=useState([]);
  useEffect(()=> {
      axios.post("https://iz-web.onrender.com/delivery/byid",{userid: userid}).then((response) =>{
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
                  <span className="itemValue">{data_user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {data_user.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{data_user.status}</span>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default Detail;
