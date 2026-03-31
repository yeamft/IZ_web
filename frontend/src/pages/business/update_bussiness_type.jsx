import "./bussiness_type.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios  from "axios";

const UpdateBussinessType = () => {

      
      const { typeId } = useParams("");
      const [data_user,setData]=useState([]);
      const uploadFile = async (e) => {
       
          axios.post(
            "http://localhost:3001/update/businesstype",{type_id: typeId,type_name: e.target.type.value,type_name_amh: e.target.type_amh.value}
          ).then((response) => {
          alert("successfull!!");
          
    })
      }
      useEffect(() => {
        axios
          .post("http://localhost:3001/businesstype/byid", { type_id: typeId })
          .then((response) => {
            setData(response.data[0]);
          });
      }, []);

    return (
        <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
              <form onSubmit={uploadFile}> 
               <div className="App">
               
           <input type="text" name="type"  defaultValue={data_user.bussiness_type_name}  required/>
           <input type="text" name="type_amh"  defaultValue={data_user.bussiness_type_name_amh}  required/>
          <button type="submit">update</button>
        </div>
        </form>
              </div>
          
          </div>
         
            );
        }
export default UpdateBussinessType;