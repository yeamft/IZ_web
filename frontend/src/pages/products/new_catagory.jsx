import "./new_catagory.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios  from "axios";

const New_catagory = () => {

      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
      const [catagory, setcatagory] = useState("");
      const [catagory_amh, setcatagory_amh] = useState("");
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
 
      const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("catagory",catagory);
        formData.append("catagory_amh",catagory_amh)
       
          axios.post(
            "https://iz-web.onrender.com/new/catagory",formData
          ).then((response) => {
          alert(response.data);
          
    })
      }
  const create_catagory = (e) => {
    const imagedata=new FormData();
    imagedata.append("image",e.target.catagory_img.value);
    
//    axios.post("https://iz-web.onrender.com/new/catagory",{catagory_name: e.target.catagory.value,catagory_image: e.target.catagory_img.value}).then((response) => {
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
            <h1>New Catagory</h1>
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
           <input type="text" name="catagory" placeholder= "Catagory Name" onChange={(e)=>setcatagory(e.target.value)} required/>
           <input type="text" name="catagory_amh" placeholder= "Catagory Name Amharic" onChange={(e)=>setcatagory_amh(e.target.value)} required/>
          <input type="file" onChange={saveFile} />
          <button onClick={uploadFile}>Upload</button>
        </div>
              </div>
          
          </div>
            );
        }
export default New_catagory;
