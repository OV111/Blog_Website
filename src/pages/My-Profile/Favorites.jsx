import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import SideBar from "./components/SideBar";
import {
  FaUserCircle,
  FaBell,
  FaRegHeart,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEdit,
  FaLocationArrow,
} from "react-icons/fa";

const Favourites = () => {
  return (
    <React.Fragment>
        <div className="flex min-h-screen">

      <SideBar/>
            </div>

            <div>
                
            </div>
    </React.Fragment>
  );
};

export default Favourites;
