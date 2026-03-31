import "./new_product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox } from "@mui/material";

const New_product = () => {
   const [images, setimage] = useState([]);
   const [product_name, setproductname] = useState("");
   const [product_name_amh, setproductnameamh] = useState("");
   const [price, setprice] = useState("");
   const [description, setdescription] = useState("");
   const [description_amh, setdescription_amh] = useState("");
   const [stock, setstock] = useState("");
   const [product_type, setproduct_type] = useState("");
   const [catagory, setcatagory] = useState("");
   const [supplier, setsupplier] = useState("");
   const [unit, setunit] = useState("");
   const [preorder, setpreorder] = useState("false");
   const [orderdate, setorderdate] = useState("0");
   const [target, settarget] = useState("");



   const [product_types, setproduct_types] = useState([]);
   const [catagories, setcatagories] = useState([]);
   const [suppliers, setsuppliers] = useState([]);
   const uploadFile = async (e) => {
      const formData = new FormData();
      formData.append("catagory", catagory);
      formData.append("product_name", product_name);
      formData.append("product_name_amh", product_name_amh);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("description_amh", description_amh);
      formData.append("stock", stock);
      formData.append("catagory_id", catagory);
      formData.append("product_type_id", product_type);
      formData.append("supplier_id", supplier);
      formData.append("target", target);
      formData.append("preorder", preorder);
      formData.append("order_date", orderdate);
      formData.append("unit", unit);
      Array.from(images).forEach(item => {
         formData.append('products', item)
      })
      const url = 'https://iz-web.onrender.com/image'
      axios.post("https://iz-web.onrender.com/product/new", formData, product_name_amh)
      .then(result => {
         alert(result)
         console.log(result);
      }).catch(err => {
         console.log(err)
      })

   }
   const view_type = (catagory_value) => {
      setcatagory(catagory_value);
      axios.post('https://iz-web.onrender.com/producttype/by_catagory', { selected_catagory: catagory_value })
         .then(res => setproduct_types(res.data))

   }
   const change_status = (e) => {

      if (preorder == "true") {
         setpreorder("false");
      }
      else if (preorder == "false") {
         setpreorder("true");
      }
   }
   useEffect(() => {
      fetch('https://iz-web.onrender.com/catagory/all')
         .then(res => res.json())
         .then(data => {
            setcatagories(data);
         });
   }, []);
   useEffect(() => {
      fetch('https://iz-web.onrender.com/suppliers/all')
         .then(res => res.json())
         .then(data => {
            setsuppliers(data);
         });
   }, []);


   return (
      <div className="new">
         <Sidebar />
         <div className="newContainer">
            <Navbar />
            <div className="top">
               <h1>New Product</h1>
            </div>
            <div className="bottom">
               {
                  Array.from(images).map(item => {
                     return (
                        <span>
                           <img style={{ padding: '10px' }} width={150} height={100} src={item ? URL.createObjectURL(item) : null} />
                        </span>
                     )
                  })
               }
               <div className="right">
                  <form>

                     <div className="formInput">
                        <input type="file" multiple onChange={(e) => { setimage(e.target.files); }} placeholder="product image" name="products" />
                        <label>Product Name</label>
                        <input type="text" onChange={(e) => { setproductname(e.target.value); }} required />
                        <label>Product Name Amharic</label>
                        <input type="text" onChange={(e) => { setproductnameamh(e.target.value); }} required />
                        <label>Price</label>
                        <input type="number" onChange={(e) => { setprice(e.target.value); }} required />
                        <label>Description</label>
                        <input type="text" onChange={(e) => { setdescription(e.target.value); }} required />
                        <label>Description Amharic</label>
                        <input type="text" onChange={(e) => { setdescription_amh(e.target.value); }} required />
                        <label>Catagory</label>
                        <select required onChange={(e) => view_type(e.target.value)}>
                           <option value="">Select</option>
                           {catagories.map(catagory => (
                              <option value={catagory.catagory_id}>{catagory.catagory_name}</option>
                           ))}
                        </select>

                        <label>Product Type</label>
                        <select required onChange={(e) => setproduct_type(e.target.value)}>
                           <option value="">Select</option>
                           {product_types.map(product_type => (
                              <option value={product_type.product_type_id}>{product_type.product_type}</option>
                           ))}
                        </select>
                        <label>Stock</label>
                        <input type="number" onChange={(e) => { setstock(e.target.value); }} name="" required />
                        <label>Unit </label>
                        <select required onChange={(e) => setunit(e.target.value)}>
                           <option value=""></option>
                           <option value="kilo">Kilo(ኪሎ)</option>
                           <option value="pieces">Pieces(ነጠላ)</option>
                           <option value="liter">Liter(ሊትር)</option>
                        </select>
                        <label>Target Group </label>
                        <select required onChange={(e) => settarget(e.target.value)}>
                           <option value=""></option>
                           <option value="Male">Male(ወንድ)</option>
                           <option value="Female">Female(ሴት)</option>
                           <option value="Both">Both(ሁለቱም)</option>
                           <option value="None">None(ምንም)</option>
                        </select>

                        <label>Pre Order</label>
                        <input type="checkbox" onChange={(e) => change_status(e.target.value)} />
                        {
                           preorder === 'true' ?
                              <div>
                                 <label>Order Maximum Date</label>
                                 <input type="number" onChange={(e) => setorderdate(e.target.value)} />
                              </div> : null
                        }
                        <label>Supplier</label>
                        <select required onChange={(e) => setsupplier(e.target.value)}>
                           <option value="">Select</option>
                           {suppliers.map(supplier => (
                              <option value={supplier.suppiler_id}>{supplier.business_name}</option>
                           ))}
                        </select>
                     </div>
                  </form>
               </div>
            </div>

            <button onClick={uploadFile}>Register</button>
         </div>
      </div>
   );
};

export default New_product;
