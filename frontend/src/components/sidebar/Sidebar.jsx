import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SettingsIcon from '@mui/icons-material/Settings';
import SummarizeIcon from '@mui/icons-material/Summarize';
import StoreIcon from "@mui/icons-material/Store";
import PasswordIcon from '@mui/icons-material/Password';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const logout =()=>
  {
  
    axios.get("http://localhost:3001/logout");
    navigate("/");

  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo"><img src="http://localhost:3000/ezi_logo.png" style={{height: 30, width: 50}}></img></span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
         
          <Link to="/home" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
        

          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
         

          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
       

          <Link to="/orders" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          </Link>
        

          <Link to="/suppliers" style={{ textDecoration: "none" }}>
          <li>
            <StorefrontIcon className="icon" />
            <span>suppliers</span>
          </li>
          </Link>
          

          <Link to="/delivery" style={{ textDecoration: "none" }}>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          </Link>
          

          <Link to="/setting" style={{ textDecoration: "none" }}>
          <li>
            <SettingsIcon className="icon" />
            <span>Setting</span>
          </li>
          </Link>
          <Link to="/setting/change_password" style={{ textDecoration: "none" }}>
          <li>
            <PasswordIcon className="icon" />
            <span>Change Password</span>
          </li>
          </Link>

          <Link to="/report" style={{ textDecoration: "none" }}>
          <li>
            <SummarizeIcon className="icon" />
            <span>Report</span>
          </li>
          </Link>
         

          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
         

        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;