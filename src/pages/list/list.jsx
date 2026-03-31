import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";


import axios  from "axios";

const List = () => {
  const [data_user,setData]=useState([]);
  const [user_id,setuserid]=useState("");
  const [view_id,setviewid]=useState("");
  useEffect(()=> {
        fetch("http://localhost:3001/users/all").then((data) => data.json())
        .then((data) => setData(data))
      
    
      }, [])
      const handleDelete = (id) => {
        
        axios.post("http://localhost:3001/users/delete",{user_id: id}).then(()=> alert("user successfully deleted!!!"),window.location.reload(false));
        window.location.reload(false);
      }; 
      const handleactive = (id) => {
        setuserid(id);
        // axios.post("http://localhost:3001/suppliers/changestatus",{userid: user_id,status_supplier: "Active"}).then(()=> alert("sucess"));
      };
// console.log(data_user);

const userColumns = [
  { field: "no", headerName: "NO", width: 70 },
  { field: "id", headerName: "ID", width: 70 },
  { field: "user_id", headerName: "Unique ID", width: 100 },
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
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "longtuide",
    headerName: "Longtuide",
    width: 160,
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
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
        
             <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="deleteButton" >View</div>
          </Link>
          {/* <Link to={`${params.row.id}/delete`} style={{ textDecoration: "none" }}>
              <div className="deleteButton" >Delete</div>
            
          </Link> */}
  
                 <div className="deleteButton" onClick={() => handleDelete(params.row.id)} >Delete</div>
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
          users
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
export default List