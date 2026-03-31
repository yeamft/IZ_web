import "./report.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import axios  from "axios";
const Report= () => {
  const [data_user,setData]=useState([]);
  const [user_id,setuserid]=useState("");
  
useEffect(()=> {
    fetch("https://iz-web.onrender.com/report").then((data) => data.json())
    .then((data) => setData(data))
  

  }, [])
 

  const userColumns = [
  
    { field: "no", headerName: "NO", width: 70 },
    { field: "order_id", headerName: "Order Id", width: 160 },
    {
      field: "full_name",
      headerName: "Delivered By",
      width: 230,
      
    },
    {
      field: "delivered_at",
      headerName: "Delivered Date",
      width: 230,
    },
  
    {
      field: "total_price",
      headerName: "Total Price",
      width: 100,
    },
   
  ];

 
 
 
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
    <div className="datatable">
      
      <div className="datatableTitle">Report</div>
      
      <DataGrid
    
        className="datagrid"
        rows={data_user}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.order_id}
        checkboxSelection
      />
  </div>
  </div>
    </div>
  );
 
};

export default Report ;
