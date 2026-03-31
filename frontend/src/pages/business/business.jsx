import "./business.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Button } from "@mui/material";
import axios  from "axios";
const Bussiness = () => {
  const [data_user,setData]=useState([]);
 
useEffect(()=> {
    fetch("https://iz-web.onrender.com/business_type/all").then((data) => data.json())
    .then((data) => setData(data))
  

  }, [])
 const create= ()=>{
  
            
 }
  const handleDelete = (id) => {
    axios.post("https://iz-web.onrender.com/businesstype/delete",{type_id: id}).then((response) => {
      
      if (response.data=="fail") {
        alert("can`t delete");
      } else if(response.data=="ok") {
        alert("Successfull!!!");
        window.location.reload(false) ;
      }
  }); 
    //setData(data_user.filter((item) => item.id !== id));
  };
 
  const userColumns = [
    { field: "id", headerName: "NO", width: 160 },
    { field: "bussiness_type_id", headerName: "ID", width: 160 },
    {
      field: "bussiness_type_name",
      headerName: "Business Type",
      width: 230,
      
    },
    {
      field: "bussiness_type_name_amh",
      headerName: "Business Type Amharic",
      width: 230,
      
    },
    {
      field: "status",
      headerName: "Status",
      width: 230,
    },
  ];

 
 
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`${params.row.bussiness_type_id}`}  style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.bussiness_type_id)}> Delete </div>
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
    <div className="datatableTitle" >
    
      
      </div>
      <div className="datatableTitle">
      <Link to="create" className="link">
          create
        </Link>
      </div>
      
      <DataGrid
    
        className="datagrid"
        rows={data_user}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.bussiness_type_id}
        checkboxSelection
      />
  </div>
  </div>
    </div>
  );
 
};

export default Bussiness ;
