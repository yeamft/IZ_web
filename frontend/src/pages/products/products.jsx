import "./products.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios  from "axios";

const Products = () => {
  const [data_user,setData]=useState([]);
  const [number,setnumber]=useState("0");
useEffect(()=> {
    fetch("https://iz-web.onrender.com/product/all").then((data) => data.json())
    .then((data) => setData(data))
  }, [])

  const handleDelete = (id) => {
    axios.post("https://iz-web.onrender.com/product/delete",{product_id: id}).then((response) => {
  
      if (response.data=="fail") {
        alert("This Product Is Already Orderd By the User");
      } else if(response.data=="ok") {
        alert("Successfull!!!");
        window.location.reload(false) ;
      }
  }); 
  }
  const userColumns = [
    
    { field: "id", headerName: "NO", width: 70 ,},
    { field: "product_id", headerName: "ID", width: 160 },
    {
      field: "name",
      headerName: "Product Name",
      width: 230,
      
    },
    {
      field: "name_amh",
      headerName: "Product Name Amharic",
      width: 230
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
  
    {
      field: "Description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "Description_amh",
      headerName: "Description Amharic",
      width: 200,
    },
    {
      field: "Stock",
      headerName: "Stock",
      width: 160,
      },
      {
        field: "catagory_name",
        headerName: "Catagory",
        width: 160,
        },
        {
          field: "catagory_name_amh",
          headerName: "Catagory Amharic",
          width: 160,
          },
        {
          field: "business_name",
          headerName: "Supplier",
          width: 200,
          },
          {
            field: "business_name_amh",
            headerName: "Supplier Amharic",
            width: 200,
            },
        {
          field: "product_type",
          headerName: "Product Type",
          width: 200,
          },
          {
            field: "product_type_amh",
            headerName: "Product Type Amharic",
            width: 200,
            },
          {
            field: "created_at",
            headerName: "registered date",
            width: 250,
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
            <Link to={`${params.row.product_id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.product_id)} >Delete</div>
            <Link to={`${params.row.product_id}/update`} style={{ textDecoration: "none" }}>
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
        
        <Link to="catagory" className="link">
          catagories
        </Link>
          
        <Link to="product_types" className="link">
          product types
        </Link>
        <Link to="new" className="link">
          new product
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

export default Products ;
