import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import WhatshotIcon from "@mui/icons-material/Whatshot";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";

import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext .jsx";

const NAVBAR_HEIGHT = 56;
const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 60;

export default function Sidebar() {
  const {user2} = useAuth();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMobile = useMediaQuery("(max-width:768px)");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  React.useEffect(() => {
    API.get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setUsername(res.data.username))
      .catch((err) => console.log(err));
  }, []);

  // Profile Menu Handlers
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  // MOBILE VIEW (BOTTOM NAV) - No changes
  if (isMobile) {
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid #ddd",
          zIndex: 999,
        }}
      >
        <BottomNavigationAction
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{ "&.Mui-selected": { color: "#FF4500" } }}
        />
        <BottomNavigationAction
          icon={<ExploreIcon />}
          onClick={() => navigate("/explore")}
          sx={{ "&.Mui-selected": { color: "#FF4500" } }}
        />
        <BottomNavigationAction
          icon={<AddCircleOutlineIcon />}
          onClick={() => navigate("/create")}
          sx={{ "&.Mui-selected": { color: "#FF4500" } }}
        />
        <BottomNavigationAction
          icon={<SendIcon />}
          onClick={() => navigate("/chat")}
          sx={{ "&.Mui-selected": { color: "#FF4500" } }}
        />
        <BottomNavigationAction
          icon={<AccountCircleIcon />}
          onClick={() => navigate(`/clarify/user/${user?.username}`)}
          sx={{ "&.Mui-selected": { color: "#FF4500" } }}
        />
      </BottomNavigation>
    );
  }

  // DESKTOP SIDEBAR
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          top: `${NAVBAR_HEIGHT}px`,
          height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
          width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
          transition: "0.3s",
          borderRight: "1px solid #e5e7eb",
        },
      }}
    >
      {/* Toggle */}
      <div className="flex px-2 py-2 justify-center">
        <IconButton 
          onClick={() => setOpen(!open)}
          className="hover:bg-gray-100 hover:rounded-lg"
        >
          {open && <span className="text-sm font-semibold mr-2">u/{username}</span>}
          <MenuIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
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

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/chat")}>
            <ListItemIcon><SendIcon /></ListItemIcon>
            {open && <ListItemText primary="Send" />}
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      {/* ONLY DESKTOP OPTIONS */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/clarify/about-us")}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            {open && <ListItemText primary="About Clarify" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/clarify/advertising")}>
            <ListItemIcon><FeaturedVideoIcon /></ListItemIcon>
            {open && <ListItemText primary="Advertising" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/clarify/out-best")}>
            <ListItemIcon><StarBorderPurple500Icon /></ListItemIcon>
            {open && <ListItemText primary="Best of Clarify" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/clarify/help")}>
            <ListItemIcon><HelpIcon /></ListItemIcon>
            {open && <ListItemText primary="Help" />}
          </ListItemButton>
        </ListItem>
      </List>

      {/* New Profile Section at the Bottom */}
      <Divider />
      
      <List sx={{ mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleProfileClick}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Profile" />}
          </ListItemButton>
        </ListItem>
      </List>

      {/* Profile Popup Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ mt: -1 }}
      >
        <MenuItem 
          onClick={() => {
            handleProfileClose();
            navigate(`/clarify/user/${user?.username || username}`);
          }}
        >
          My Profile
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handleProfileClose();
            navigate("/settings"); // You can change this route if needed
          }}
        >
          Settings
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handleProfileClose();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Drawer>
  );
}