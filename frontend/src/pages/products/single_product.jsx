import "./single_product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";




import {useParams} from 'react-router-dom';

import { useState,useEffect } from "react";
import axios from "axios";
import SimpleImageSlider from "react-simple-image-slider";
import { height } from "@mui/system";
const Single_Product = () => {
  const { productId } = useParams("");
  const [data_user,setData]=useState([]);
   const [image,setimage]=useState([0]);
   const [index, setIndex] = useState(0);
 
  
  useEffect(()=> {
      axios.post("https://iz-web.onrender.com/product/byid",{product_id: productId}).then((response) =>{
setData(response.data[0]);

      })
    
  
    }, [])
    useEffect(()=> {
      axios.post("https://iz-web.onrender.com/product_image/byid",{product_id: productId}).then((response) =>{
 setimage(response.data);
 
 

      })
    
  
    }, [])
    const slideRight = () => {
      setIndex((index + 1) % image.length); // increases index by 1
    };
  
    const slideLeft = () => {
      const nextIndex = index - 1;
      if (nextIndex < 0) {
        setIndex(image.length - 1); // returns last index of images array if index is less than 0
      } else {
        setIndex(nextIndex);
      }
    };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              
            {/* <SimpleImageSlider
        width={400}
        height={300}
        images={"http://localhost/ecommerce/images/DETERGENTS.png"}
        showBullets={true}
        showNavs={true}
      /> */}

   
      <div>
        <button onClick={slideLeft}>{"<"}</button>
    
         <img src={"http://localhost/"+image[index].image_path} alt={index} style={{height: 400, width: 400 }} /> 
        <button onClick={slideRight}>{">"}</button>
      </div>
              <div className="details">
                <h1 className="itemTitle">{data_user.name}</h1>
                
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data_user.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">
                  {data_user.Description}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Stock:</span>
                  <span className="itemValue">{data_user.Stock}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Unit:</span>
                  <span className="itemValue">{data_user.unit}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Catagory:</span>
                  <span className="itemValue">{data_user.catagory_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Product Type:</span>
                  <span className="itemValue">{data_user.product_type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Target Group:</span>
                  <span className="itemValue">{data_user.target_group}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pre Order:</span>
                  <span className="itemValue">{data_user.pre_order}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pre Order Date:</span>
                  <span className="itemValue">{data_user.date_order}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Registered Date:</span>
                  <span className="itemValue">{data_user.created_at}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Supplier:</span>
                  <span className="itemValue">{data_user.business_name}</span>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default Single_Product;
