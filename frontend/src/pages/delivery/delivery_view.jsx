import "./delivery_view.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios  from "axios";
const Delivery= () => {
  const [data_user,setData]=useState([]);
  const [user_id,setuserid]=useState("");
  const [status,setstatus]=useState("");
useEffect(()=> {
    fetch("http://localhost:3001/delivery/all").then((data) => data.json())
    .then((data) => setData(data))
  

  }, [])
  for(let i=0; i<data_user.length; i++)
  {
    if(data_user[i].status==0)
    {
      data_user[i].status='NotActive';
    }
   else if(data_user[i].status==1)
    {
      data_user[i].status='Active';
    }
  }
  const change_status = (id,status) => {
    let user_status;
    if(status=="Active")
    {
     user_status=0;
    }
    else if(status=="NotActive")
    {
      user_status=1;
    }
    
    axios.post("http://localhost:3001/delivery/changestatus",{userid: id,status_delivery: user_status}).then(()=> alert("sucess"));
  };

  const handleDelete = (id) => {
    axios.post("http://localhost:3001/delivery/delete",{delivery_id: id}).then(()=> alert("sucess"));
  };
  const userColumns = [
  
    { field: "user_id", headerName: "NO", width: 70 },
    { field: "user_id", headerName: "ID", width: 160 },
    {
      field: "full_name",
      headerName: "Full Name",
      width: 230,
      
    },
    {
      field: "longtuid",
      headerName: "Longtuide",
      width: 230,
    },
  
    {
      field: "latitude",
      headerName: "Latitude",
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      width: 160,
      },
      {
        field: "phone",
        headerName: "Phone Number",
        width: 160,
        },
        {
          field: "status",
          headerName: "Status",
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
            <Link to={`${params.row.user_id}`} style={{ textDecoration: "none" }}>
              <div className="deleteButton" >View</div>
          </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.user_id)}>
              Delete
            </div>
            <div
              className="deleteButton"
              onClick={() => change_status(params.row.user_id,params.row.status)}>
               {params.row.status}
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
      
      </div>
      
      <DataGrid
    
        className="datagrid"
        rows={data_user}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.user_id}
        checkboxSelection
      />
  </div>
  </div>
    </div>
  );
 
};

export default Delivery ;