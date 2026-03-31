import "./new_catagory.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios  from "axios";

const UpdateType = () => {

      const [file, setFile] = useState();
      const { typeId } = useParams("");
      const [fileName, setFileName] = useState("");
      const [catagory, setcatagory] = useState("");
      const [data_user,setData]=useState([]);
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
 
      const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("type",e.target.type.value)
        formData.append("type_amh",e.target.type_amh.value)
        formData.append("type_id",typeId)
        formData.append("catagory",e.target.catagory.value)
        
       
          axios.post(
            "https://iz-web.onrender.com/update/type",formData
          ).then((response) => {
          alert(response.data);
          
    })
      }
      useEffect(() => {
        axios
          .post("https://iz-web.onrender.com/type/byid", { type_id: typeId })
          .then((response) => {
            setData(response.data[0]);
          });
      }, []);
      const [catagories, setcatagories] = useState([]);
      useEffect(() => {
        fetch("https://iz-web.onrender.com/catagory/all")
          .then((res) => res.json())
          .then((data) => {
            setcatagories(data);
          });
      }, []);
    return (
        <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>New Catagory</h1>
          </div>
    
            
        
              <form onSubmit={uploadFile}> 
               <div className="App">
               
           <input type="text" name="type" placeholder= "Product Type" defaultValue={data_user.product_type} style={{margin: 25}} required/>
           <input type="text" name="type_amh" placeholder= "Product Type Amharic" defaultValue={data_user.product_type_amh} style={{margin: 25}} required/>
           <img src={`http://192.168.0.137/ecommerce/images/${data_user.image_name}.png`} alt="image"></img>
       
          <input type="file"  onChange={saveFile} style={{margin: 25}}/>
          <div className="detailItem">
                  <span className="itemKey">Catagory:</span>
                  <select name="catagory" defaultValue={data_user.catagory_id}
                    required
          
                  >
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
          <button
          style={{margin: 25}} type="submit">update</button>
        </div>
        </form>
              </div>
          
          </div>
         
            );
        }
export default UpdateType;
