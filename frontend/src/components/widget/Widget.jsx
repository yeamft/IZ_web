import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React,{useState,useEffect} from "react";
import axios from 'axios';

const Widget=({type}) =>
{
      const [suppliers,viewsuppliers]=useState("");
      useEffect(()=> 
    {
        axios.get("http://localhost:3001/dashboard/suppliers").then((response)=>
          {
            viewsuppliers(response.data[0]);
          });

    },[]);
    const [users,fetchuser]=useState("");
    useEffect(()=> 


    
     {
            axios.get("http://localhost:3001/dashboard/users").then((response)=>
            {
              fetchuser(response.data[0]);
            });
      },[]);
    const [orders,fetchorders]=useState("");
    useEffect(()=>
    {
          axios.get("http://localhost:3001/dashboard/todayorder").then((response)=>
          {
            fetchorders(response.data[0]);
          });

    },[]);
    const [deliverys,fetchdelivery]=useState("");
    let info;
    useEffect(()=>
    {
      axios.get("http://localhost:3001/dashboard/delivery").then((response)=>
       {
           fetchdelivery(response.data[0]);

        });

    },[]);
    switch(type)
    {
        case "users":
            info=
             {
                title: "total users",
                count: users.user_id , 
              };
         break;
       case "orders":
            info=
              {
                title: "total orders",
                count: orders.order_id , 
              };
         break;
       case "suppliers":
            info=
                {
                  title: "total suppliers",
                  count: suppliers.suppiler_id , 
                };
         break;
       case "delivery":
            info=
                 {
                    title: "total delivery ",
                    count: deliverys.user_id , 
                 };
         break;
     }


  return (
     <div className="widget">
         <div className="left">
           <span className="title">
           {info.title}
           </span>
           <span className="counter">
           {info.count}
           </span>
           <span className="link">
            untill today
           </span>
         </div>
       <div className="right">
          <div className="percentage positive">
              <KeyboardArrowUpIcon />
           </div>
        
        </div>
      </div>
    
          );
   };

export default Widget;