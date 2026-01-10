import * as React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import API from "../api/axios.js"


import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ExploreIcon from "@mui/icons-material/Explore";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NAVBAR_HEIGHT = 56;
const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 72;

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You logged out ");
    window.location.reload();
    navigate("/");
  }

  useEffect(() => {
    API.get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  }, []);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          top: `${NAVBAR_HEIGHT}px`,
          height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
          width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
          overflowX: "hidden",
          transition: "width 0.3s",
          borderRight: "1px solid #e5e7eb",
        },
      }}
    >
      {/* Toggle Button */}
      <div className="flex justify-start px-2 py-2">
        <IconButton
          onClick={() => setOpen(!open)}
          className={`flex items-center menu-icon ${open ? 'gap-6' : 'gap-0 justify-start'
            }`}
        >
          {open ? (
            <h1 className="text-sm font-semibold text-gray-800 m-0">
              u/{username}
            </h1>
          ) : null}

          <MenuIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><WhatshotIcon /></ListItemIcon>
            {open && <ListItemText primary="Trending" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><ExploreIcon /></ListItemIcon>
            {open && <ListItemText primary="Explore" />}
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            {open && <ListItemText primary="About Reddit" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><FeaturedVideoIcon /></ListItemIcon>
            {open && <ListItemText primary="Advertizing" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><StarBorderPurple500Icon /></ListItemIcon>
            {open && <ListItemText primary="Best of Clarify" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><HelpIcon /></ListItemIcon>
            {open && <ListItemText primary="Help" />}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      {/* BOTTOM PROFILE */}
      <div className="profile-section">
        <div className="profile-row" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img
            src={user?.image || "https://i.pravatar.cc/40"}
            alt="profile"
            className="profile-img"
          />
          {open ? (
            <p className="text-sm font-bold text-gray-800 m-0">
              {username}
            </p>
            ) : null
          }
        </div>

        {dropdownOpen && (
          <div className="profile-dropdown">
            <Link className="drop-icon" to={`/clarify/user/${user?.username}`}><AccountCircleIcon/> Profile</Link>
            <Link className="drop-icon"><SettingsIcon/>Settings</Link>
            <Link className="drop-icon logout" onClick={handleLogout} >
              <LogoutIcon/>Logout
            </Link>
          </div>
        )}
      </div>
    </Drawer>
  );
}
