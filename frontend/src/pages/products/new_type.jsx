import "./new_catagory.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import axios  from "axios";

const New_type = () => {

  const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
      const [catagory, setcatagory] = useState("");
      const [product_type, settype] = useState("");
      const [product_type_amh, settype_amh] = useState("");
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
 
      const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("catagory",catagory)
        formData.append("product_type",product_type)
        formData.append("product_type_amh",product_type_amh)
          axios.post(
            "http://localhost:3001/new/product_type",formData
          ).then((response) => {
          alert(response.data);
          
    })
      }
      const [catagories, setcatagories] = useState([]);

      useEffect(() => {
        fetch('http://localhost:3001/catagory/all')
          .then(res => res.json())
          .then(data => {
            setcatagories(data);
          });
      }, []);
  const create_catagory = (e) => {
    const imagedata=new FormData();
    imagedata.append("image",e.target.catagory_img.value);
    
//    axios.post("http://localhost:3001/new/catagory",{catagory_name: e.target.catagory.value,catagory_image: e.target.catagory_img.value}).then((response) => {
//     console.log(response.data);
    // if (response.data=="fail") {
    //   alert("This Product Is Already Orderd By the User");
    // } else if(response.data=="ok") {
    //   alert("Successfull!!!");
    // }
//   });
  }
    return (
        <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>New product type</h1>
          </div>
    
            
              {/* <form onSubmit={uploadFile} >
                <div className="formInput" >
                   <label>Catagory Name</label>
                    <input type="text" name="catagory" placeholder= "Catagory Name" required/>
                    <input type="file" name="catagory_img" accept="img/*" required/>
                  </div>
                  <button type="submit">Save</button>
              </form> */}
               <div className="App">
           <input type="text" name="catagory" placeholder= "Product type" onChange={(e)=>settype(e.target.value)} required/>
           <input type="text" name="catagory_amh" placeholder= "Product type_amh" onChange={(e)=>settype_amh(e.target.value)} required/>
          <input type="file" onChange={saveFile} />
          <span className="itemKey">Catagory:</span>
                  <select  required onChange={(e)=>setcatagory(e.target.value)}>
                       <option value="">Select</option>
                           {catagories.map(catagory => (
                       <option value={catagory.catagory_id}>{catagory.catagory_name}</option>
                           ))}
                 </select>
          <button onClick={uploadFile}>Upload</button>
        </div>
              </div>
          
          </div>
            );
        }
export default New_type;