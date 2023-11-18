import React, { useState } from "react";
import ReorderIcon from "@mui/icons-material/Reorder";
import { IconButton, Avatar } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AppsIcon from "@mui/icons-material/Apps";
// import logo from "../assests/sharp-mail-low-resolution-logo-color-on-transparent-background.png";
import "./Header.css";
import {auth} from '../config/firebase';
import {useNavigate} from 'react-router-dom';
import {  useSelector} from "react-redux";
// import React, { useState } from "react";


const Header = () => {

  const navigate = useNavigate();
  const user = useSelector(state => state.auth.email);

  const sanitizedUser = user.replace(/[@.]/g, '');


  const handleLogout = async () => {
   
  
    try {
      await auth.signOut();
      navigate('/');

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
 


  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <ReorderIcon />
        </IconButton>
        {/* <img
          // src={logo}
          alt="logo"
          style={{
            maxWidth: "150px",
            maxHeight: "auto",
          }} */}
        
      </div>
      <div className="header__middle">
        {/* <div className="search_mail">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search mail" />
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </div> */}
      </div>
     
      <div className="header__right">
        {/* <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <AppsIcon />
        </IconButton> */}
        <div className="san">{sanitizedUser}</div>
        <Avatar onClick={handleLogout}/>
       
      </div>
    </div>
  );
};

export default Header;
