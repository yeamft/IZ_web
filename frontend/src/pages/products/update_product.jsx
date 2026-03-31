import "./single_product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
const Update_Product = () => {
  const [data_user, setData] = useState([]);
  const [preorder, setpreorder] = useState("false");
  const [orderdate, setorderdate] = useState("0");
  const [uploadimage, setimagestatus] = useState("false");
  const [image_id, setimage_id] = useState("");

  const [product_name, setproduct_name] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [stock, setstock] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [product_type_id, settype_id] = useState("");
  const [supplier_id, setsupplier_id] = useState("");
  const [unit, setunit] = useState("");
  const [target_group, settarget_group] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");



  const [images, setimage] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/product/byid", { product_id: productId })
      .then((response) => {
        setData(response.data[0]);
        

      })
   
  }
 ,
   []);
   const update = async (e) =>
    {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileName", fileName);
          formData.append("product_id",productId);
          formData.append("image_id",image_id);
          console.log(image_id);
        
            axios.post(
              "http://localhost:3001/update/product_image",formData
            ).then((response) => {
            alert(response.data);
            window.location.reload(false) ;
              })
    }
        
  const { productId } = useParams("");
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const change_status =(e)=>
  {
    
    if(preorder=="true")
    {
      setpreorder("false");
    }
    else  if(preorder=="false")
    {
      setpreorder("true");
    }
  }
  const update_image =(value)=>
  {
    
    if(uploadimage=="true")
    {
      setimagestatus("false");
      setimage_id("");
    }
    else  if(uploadimage=="false")
    {
      setimagestatus("true");
      setimage_id(value);
    }
  }
  const update_product_detail = (e) => 
{
  
  // console.log(e.target.category_id);
      // product_id: productId,
    // product_name: product_name,
    // price: price,
    // description: description,
    // stock: stock,
    // catagory_id: category_id,
    // product_type_id: product_type_id,
    // supplier_id: supplier_id,
    // unit: unit,
    // target_group: target_group,
    // preorder : preorder,
    // date_order: orderdate
    const formData = new FormData();
     formData.append("product_id", productId);
     formData.append("product_name", e.target.product_name.value);
     formData.append("product_name_amh", e.target.product_name_amh.value);
     formData.append("price", e.target.price.value);
     formData.append("description", e.target.description.value);
     formData.append("description_amh", e.target.description_amh.value);
     formData.append("stock", e.target.stock.value);
     formData.append("catagory_id", e.target.category_id.value);
     formData.append("product_type_id", e.target.product_type_id.value);
     formData.append("supplier_id", e.target.supplier_id.value);
     formData.append("unit", e.target.unit.value);
     formData.append("target_group", e.target.target_group.value);
     formData.append("preorder", e.target.preorder.value);
     formData.append("date_order", orderdate);
  
    axios
      .post("http://localhost:3001/product/update",  
        {product_id: productId,
        product_name: e.target.product_name.value,
        product_name_amh: e.target.product_name_amh.value,
        price: e.target.price.value,
        description: e.target.description.value,
        description_amh: e.target.description_amh.value,
        stock: e.target.stock.value,
        catagory_id: e.target.category_id.value,
        product_type_id: e.target.product_type_id.value,
        supplier_id: e.target.supplier_id.value,
        unit: e.target.unit.value,
        target_group: e.target.target_group.value,
        preorder : preorder,
        date_order: orderdate}
      )
      .then(() => alert("sucess"));
    // console.log(e.target.price.value);
  };

  const [catagories, setcatagories] = useState([]);
  // console.log(data_user);

  useEffect(() => {
    fetch("http://localhost:3001/catagory/all")
      .then((res) => res.json())
      .then((data) => {
        setcatagories(data);
      });
  }, []);


  
  const [product_types, setproduct_types] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/producttype/all")
      .then((res) => res.json())
      .then((data) => {
        setproduct_types(data);
      });
  }, []);
  const [suppliers, setsuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/supplier")
      .then((res) => res.json())
      .then((data) => {
        setsuppliers(data);
      });
  }, []);
  const [state, setState] = useState([]);


  useEffect(()=> {
    axios.post("http://localhost:3001/product_image/byid",{product_id: productId}).then((response) =>{
setimage(response.data);
    })
  }, [])
   
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Update Product</h1>
            <div className="item">
            {
              <span>
{images[0] ? <img
                style={{ padding: '10px' }}
                width={150} height={100}
                onClick={(e)=> update_image(images[0].image_id) }
                src={"http://localhost/"+ images[0].image_path} value={images[0].image_id}/> : <img
                style={{ padding: '10px' }}
                width={150} height={100}
                src={"http://localhost:3000/empty_image.png"} 
                onClick={(e)=> update_image("new") }
                />}
                
{images[1] ? <img
                style={{ padding: '10px' }}
                width={150} height={100}
                src={"http://localhost/"+ images[1].image_path} value={images[1].image_id}
                onClick={(e)=> update_image(images[1].image_id) }/> : <img
                style={{ padding: '10px' }}
                width={150} height={100}
                src={"http://localhost:3000/empty_image.png"} 
                value="new"
                onClick={(e)=> update_image("new") }/>}

{images[2] ? <img
                style={{ padding: '10px' }}
                width={150} height={100}
                src={"http://localhost/"+ images[2].image_path} value={images[2].image_id}
                onClick={(e)=> update_image(images[2].image_id) }/> : <img
                style={{ padding: '10px'
                  }}
                
                width={150} height={100}
                src={"http://localhost:3000/empty_image.png"} 
                
                onClick={(e)=> update_image("new") }/>}
  {images[3] ? <img
                style={{ padding: '10px' }}
                width={150} height={100}
                src={"http://localhost/"+ images[3].image_path} value={images[3].image_id} 
                onClick={(e)=> update_image(images[3].image_id) }/> : <img
                style={{ padding: '10px' }}
                width={150} height={100}
                src={"http://localhost:3000/empty_image.png"}
                onClick={(e)=> update_image("new") } />}
              
              
                
                

            </span>
      }
        {
        uploadimage === 'true' ? 
          <div>
            <label>uploadimage</label>
                      <input  type="file" name="update_image" onChange={saveFile}   />
                      <button onClick={update}>Upload Image</button>
          </div> : null
      }
             
              <div className="details">
              <form onSubmit={update_product_detail}>
              <div className="detailItem">
                <input type="text" defaultValue={data_user.name} name="product_name"    required  />
                <span className="itemKey">Product Name Amharic:</span>
                  <input type="text" name="name_amh" defaultValue={data_user.name_amh}  required  />
                  <span className="itemKey">Price:</span>
                  <input type="text" name="price" defaultValue={data_user.price}  required  />
          
                  <span className="itemKey">Description:</span>
                  <input
                    type="text"
                    name="description"
                    defaultValue={data_user.Description} 
                    
          required/>
          <span className="itemKey">Description Amharic:</span>
                  <input
                    type="text"
                    name="description_amh"
                    defaultValue={data_user.Description_amh} 
                    
          required/>
           
                
                  <span className="itemKey">Stock:</span>
                  <input
                    type="text"
                    name="stock"
                    defaultValue={data_user.Stock}
                    
                    required
                    
                  />
            <span className="itemKey">Unit:</span>
                  <div className="detailItem">
                  <select name="unit"
                 
                    required
                  
                  >
                    <option value={data_user.unit}>
                      {data_user.unit} 
                    </option>
                       <option value="kilo">Kilo(ኪሎ)</option>
                       <option value="pieces">Pieces(ነጠላ)</option>
                        <option value="liter">Liter(ሊትር)</option>
                  </select>
                  </div>

                  <span className="itemKey">Catagory:</span>
                  <div className="detailItem">
                  <select name="category_id"  required>
                    <option value={data_user.catagory_id}>
                      {data_user.catagory_name}
                    </option>
                    {catagories.map((catagory) => (
                      <option value={catagory.catagory_id}>
                        {catagory.catagory_name}
                      </option>
                    ))}
                  </select>
                  </div>
               
                 
                  <span className="itemKey">Product Type:</span>
                  <div className="detailItem">
                  <select
                  name="product_type_id"
                 
                    required
                    
                  >
                    <option value={data_user.product_type_id}>
                      {data_user.product_type}
                    </option>
                    {product_types.map((type) => (
                      <option value={type.product_type_id}>
                        {type.product_type}
                      </option>
                    ))}
                  </select>
                  </div>
                  <span className="itemKey">Supplier:</span>
                  <div className="detailItem">
                  <select name="supplier_id" 
                    required
                  
                  >
                    <option value={data_user.suppiler_id}>
                      {data_user.business_name} 
                    </option>
                    {suppliers.map((supplier) => (
                      <option value={supplier.suppiler_id}>
                        {supplier.business_name}
                      </option>
                    ))}
                  </select>
                  </div>

                  <span className="itemKey">Target Group:</span>
                  <div className="detailItem">
                  <select name="target_group" 
                    required
                  
                  >
                    <option value={data_user.target_group}>
                      {data_user.target_group} 
                    </option>
                           <option value="Male">Male(ወንድ)</option>
                           <option value="Female">Female(ሴት)</option>
                           <option value="Both">Both(ሁለቱም)</option>
                           <option value="None">None(ምንም)</option>
                  
                  </select>
                  </div>

                  <label>Pre Order</label>
                      <input type="checkbox" name="preorder" defaultValue={data_user.pre_order}   onChange={(e)=>change_status(e.target.value)} />
       
                      {
        preorder === 'true' ? 
          <div>
            <label>Order Maximum Date</label>
                      <input type="number" name="orderdate" onChange={(e)=> setorderdate(e.target.value)} defaultValue={data_user.date_order}   />
          </div> : null
      }
                


              <div className="detailItem">
                <button type="submit"
                  style={{ backgroundColor: "green" }}>
                  Update
                </button>
                </div>
                </div>
                {/* onClick={update_product} */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_Product;
