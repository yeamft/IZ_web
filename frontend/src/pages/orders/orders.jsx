import "./orders.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import axios  from "axios";
const Orders = () => {
  const [data_user,setData]=useState([]);
  const [user_id,setuserid]=useState("");
  const [payment_status,setpayment_status]=useState("");
useEffect(()=> {
    fetch("https://iz-web.onrender.com/orders/all").then((data) => data.json())
    .then((data) => setData(data) )
  }, [])

  
  const setstatus =(status_payment)=>
  {
    if(status_payment=='0')
    {
      return "unpaid";
      
    }
    else if(status_payment=='1'){
      return "paid";
    }
  }
  
  const change_status = (id,status) => {
 
    let payment=0;
    if(status==0)
    {
     payment=1;
    }
    else if(status==1)
    {
      payment=0;
    }
    
    axios.post("https://iz-web.onrender.com/order/changestatus",{payment_status: payment,order_id: id}).then(()=> alert("sucess"));
    window.location.reload(false);
  };
  const change_order_status = (id,status) => {
 
    let order_status="pending";
    if(status==="pending")
    {
      order_status="delivered";
    }
    else if(status==="delivered")
    {
      order_status="pending";
    }
    
    axios.post("https://iz-web.onrender.com/order/change_delivery_status",{delivery_status: order_status,order_id: id}).then(()=> alert("sucess"));
    window.location.reload(false);
  };
  
  const handleactive = (id) => {
    setuserid(id);
    axios.post("https://iz-web.onrender.com/suppliers/changestatus",{userid: user_id,status_supplier: "Active"}).then(()=> alert("sucess"));
  };

  const userColumns = [
  
     { field: "id", headerName: "NO", width: 70 },
    { field: "order_id", headerName: "ID", width: 160 },
    {
      field: "status",
      headerName: "Order Status",
      width: 150,
      
    },
    {
      field: "total_price",
      headerName: "Total Price",
      width: 100,
    },
  
    {
      field: "createdt_at",
      headerName: "Ordered Date",
      width: 250,
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 160,
      },
      {
        field: "Description",
        headerName: "Product Description",
        width: 300,
        },
        {
          field: "price",
          headerName: "Product Price",
          width: 160,
          },
          
          {
            field: "quantity",
            headerName: "Quantity",
            width: 100,
            },
            {
              field: "address",
              headerName: "Delivery Address",
              width: 300,
              },
              {
                field: "phone_number",
                headerName: "User Phone Number",
                width: 150,
                },
              {
             
              field: "business_name",
              headerName: "Supplier",
              width: 400,
              
  
              },
              {
             
                field: "multi_vendor",
                headerName: "Multi Vendor",
                width: 160,
                
    
                },
          {
             
            field: "payment_status",
            headerName: "Payment Status",
            width: 160,
            

            }
      
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
              
            <div
              className="deleteButton"
              onClick={() => change_status(params.row.order_id,params.row.payment_status)}
            >
          {setstatus(params.row.payment_status)}
              
            </div>
            <div
              className="deleteButton"
              onClick={() => change_order_status(params.row.order_id,params.row.status)}
            >
          {params.row.status}
              
            </div>
            <Link to={`${params.row.order_id}/assign`} className="link">
            <div className="deleteButton">
              
              Assign
            </div>
            </Link>
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
        getRowId={(row) => row.order_id}
        checkboxSelection
      />
  </div>
  </div>
    </div>
  );
 
};

export default Orders ;
