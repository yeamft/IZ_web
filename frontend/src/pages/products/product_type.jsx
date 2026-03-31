import "./catagories.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios  from "axios";
import { width } from "@mui/system";

const Product_types = () => {
  const [data_user,setData]=useState([]);
 
useEffect(()=> {
    fetch("https://iz-web.onrender.com/producttype/all").then((data) => data.json())
    .then((data) => setData(data))
  

  }, [])

  const handleDelete = (id) => {
    console.log(id);
    axios.post("https://iz-web.onrender.com/type/delete",{type_id: id}).then((response) => {
      if (response.data=="fail") {
        alert("There is products registered under this product type");
      } else if(response.data=="ok") {
        alert("Successfull!!!");
      }
  }); 
  }
  const userColumns = [
    
    { field: "id", headerName: "NO", width: 70 },
    { field: "product_type_id", headerName: "ID", width: 160 },
    {
      field: "product_type",
      headerName: "Product Type",
      width: 230,
      
    },
    {
      field: "product_type_amh",
      headerName: "Product Type Amharic",
      width: 230,
      
    },
    {
      field: "image_path",
      headerName: "Image",
      width: 300,
      renderCell: (params) => <img src={"http://localhost/"+params.value} style={{width: 80, margin: 20 ,padding: 30}}/>
  
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
          
            <div className="deleteButton" onClick={() => handleDelete(params.row.product_type_id)} >Delete</div>
            <Link to={`${params.row.product_type_id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
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
        
        <Link to="new" className="link">
          add new
        </Link>
      
      </div>
      
      <DataGrid
    
        className="datagrid"
        rows={data_user}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
        getRowId={(row) => row.product_type_id}
        checkboxSelection
        
      />
  </div>
  </div>
    </div>
  );
 
};

export default Product_types ;
