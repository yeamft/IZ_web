import "./suppliers.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Viewsupplier from "./view_supplier";
import axios  from "axios";
const Suppliers = () => {
  const [data_user,setData]=useState([]);
  const [user_id,setuserid]=useState("");
  
useEffect(()=> {
    fetch("http://localhost:3001/suppliers/all").then((data) => data.json())
    .then((data) => setData(data))
  

  }, [])
  const change_status = (id,status) => {
   
    let user_status;
    if(status=="Active")
    {
     user_status="NotActive";
    }
    else if(status=="NotActive")
    {
      user_status="Active";
    }
    
    axios.post("http://localhost:3001/suppliers/changestatus",{userid: id,status_supplier: user_status}).then(()=> alert("sucess"),window.location.reload(false));
  };
// console.log(data_user);
  const handleDelete = (id) => {
  
    axios.post("http://localhost:3001/supplier/delete",{supplier_id: id}).then((response) => {
  
      if (response.data=="fail") {
        alert("Order already exist from this supplier!!");
      } else if(response.data=="ok") {
        alert("Successfull!!!");
        window.location.reload(false);

      }
    });
  }
  const userColumns = [
    { field: "no", headerName: "NO", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "suppiler_id", headerName: "Unique ID", width: 160 },
    {
      field: "business_name",
      headerName: "Business Name",
      width: 230,
      
    },
    {
      field: "business_name_amh",
      headerName: "Busniess Name Amharic",
      width: 230,
    },
    {
      field: "bussiness_owner_name",
      headerName: "Bussiness Owner Name",
      width: 230,
    },
    {
      field: "image_path",
      headerName: "Photo",
      width: 230,
      renderCell: (params) => <img src={"http://localhost/"+params.value} style={{width: 80}}/>
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field: "city",
      headerName: "City",
      width: 160,
      },
      {
        field: "subcity",
        headerName: "Sub City",
        width: 160,
        },
        {
          field: "phone_number",
          headerName: "Phone Number",
          width: 160,
          },
          {
            field: "company_registration_number",
            headerName: "Company Registration Number",
            width: 250,
            },
            {
              field: "tin_number",
              headerName: "Tin Number",
              width: 160,
              },
          {
            field: "status",
            headerName: "status",
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
            <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="deleteButton" >View</div>
          </Link>
          <div
              className="deleteButton"
              onClick={() => change_status(params.row.suppiler_id,params.row.status)}
            >
          {params.row.status}
              
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.suppiler_id)}>
              Delete
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
        
        <Link to="new" className="link">
          Add New
        </Link>
        <Link to="business" className="link">
          Business Types
        </Link>
      </div>
      
      <DataGrid
    
        className="datagrid"
        rows={data_user}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.id}
        checkboxSelection
      />
  </div>
  </div>
    </div>
  );
 
};

export default Suppliers ;