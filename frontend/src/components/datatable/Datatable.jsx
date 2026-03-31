
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import axios  from "axios";
const Datatable = () => {
  const [data_user,setData]=useState([]);
  const [user_id,setuserid]=useState("");
  const [view_id,setviewid]=useState("");
  useEffect(()=> {
        fetch("https://iz-web.onrender.com/users/all").then((data) => data.json())
        .then((data) => setData(data))
      
    
      }, [])
      const handleDelete = (id) => {
        setuserid(id);
        // axios.post("https://iz-web.onrender.com/suppliers/changestatus",{userid: user_id,status_supplier: "NotActive"}).then(()=> alert("sucess"));
      };
      const handleactive = (id) => {
        setuserid(id);
        // axios.post("https://iz-web.onrender.com/suppliers/changestatus",{userid: user_id,status_supplier: "Active"}).then(()=> alert("sucess"));
      };
// console.log(data_user);

const userColumns = [
  
  { field: "id", headerName: "NO", width: 70 },
  { field: "user_id", headerName: "ID", width: 70 },
  {
    field: "phone_number",
    headerName: "Phone Number",
    width: 230,
    
  },
  {
    field: "full_name",
    headerName: "Full Name",
    width: 230,
  },

  {
    field: "longtuide",
    headerName: "Longtuide",
    width: 100,
  },
  {
    field: "latitude",
    headerName: "Latitude",
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
              onClick={() => handleDelete(params.row.id)}
            >
              Deactive
              
            </div>
            <div
              className="deleteButton"
              onClick={() => handleactive(params.row.id)}
            >
              
              Activate
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
    <div className="listContainer">
 
    <div className="datatable">
      
      <div className="datatableTitle">
        
        <Link to="new" className="link">
          Add New
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

export default Datatable ;
