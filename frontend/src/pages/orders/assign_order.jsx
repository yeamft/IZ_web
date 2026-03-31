import "./orders.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {useParams} from 'react-router-dom';
import axios  from "axios";
const Order_assign  = () => {
    const {orderId} = useParams("");
  const [data_user,setData]=useState([]);
  const [user_id,setuserid]=useState("");
  const [payment_status,setpayment_status]=useState("");
useEffect(()=> {
    axios.post("https://iz-web.onrender.com/order/assign",{order_id: orderId}).then((response) =>{
      if(response.data=="failed")
      {
          setData("");
      }
      else
      {
        setData(response.data);
      }
})
      
    // .then((response) => setData(response))

  

}, []);
  
 
  const assign_delivery = (id) => {
    
   // axios.post("https://iz-web.onrender.com/delivery/assign",{order_id: orderId,delivery_id: id}).then(()=> alert("sucess"));
  };
  const handleactive = (id) => {
    setuserid(id);
    axios.post("https://iz-web.onrender.com/suppliers/changestatus",{userid: user_id,status_supplier: "Active"}).then(()=> alert("sucess"));
  };

  const userColumns = [
  
    { field: "id", headerName: "NO", width: 70 },
    { field: "user_id", headerName: "ID", width: 160 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 230,
      
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 230,
    },
  
    {
      field: "phone",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "distance",
      headerName: "Distance",
      width: 160,
      },
      
      {
        field: "address",
        headerName: "Address",
        width: 160,
        },
  ];

 
 
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
        
          <div className="cellAction">
            {/* <Link   style={{ textDecoration: "none" }} className="link" onClick={() => handleview(params.row.id)}> */}
              {/* <div className="deleteButton" onClick={() => handleview(params.row.user_id)}>View</div> */}
              {/* </Link> */}
              
           
            <div className="deleteButton" onClick={assign_delivery(params.row.user_id)}>
              Assign
            </div>
            
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
    <div className="datatable">
      
      <div className="datatableTitle">
        
       orders
       
      </div>
      
      <DataGrid
    
        className="datagrid"
        rows={data_user}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(rows) =>rows.user_id}
        checkboxSelection
      />
  </div>
  </div>
    </div>
  );
 
};

export default Order_assign ;
