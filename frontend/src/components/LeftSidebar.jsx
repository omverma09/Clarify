import * as React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext .jsx";

import {
  Drawer,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const NAVBAR_HEIGHT = 56;
const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 64;

const NAV_ITEMS = [
  { icon: <HomeRoundedIcon fontSize="small" />, label: "Home", path: "/" },
  { icon: <WhatshotRoundedIcon fontSize="small" />, label: "Trending", path: "/clarify/trending" },
  { icon: <ExploreRoundedIcon fontSize="small" />, label: "Explore", path: "/clarify/explore" },
  { icon: <SendRoundedIcon fontSize="small" />, label: "Messages", path: "/chat" },
];

const SECONDARY_ITEMS = [
  { icon: <InfoOutlinedIcon fontSize="small" />, label: "About Clarify", path: "/clarify/about-us" },
  { icon: <CampaignOutlinedIcon fontSize="small" />, label: "Advertising", path: "/clarify/advertising" },
  { icon: <StarBorderRoundedIcon fontSize="small" />, label: "Best of Clarify", path: "/clarify/out-best" },
  { icon: <HelpOutlineRoundedIcon fontSize="small" />, label: "Help", path: "/clarify/help" },
];

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileValue, setMobileValue] = React.useState(0);

  const isMobile = useMediaQuery("(max-width:768px)");
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    API.get("/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => { setUsername(res.data.username); setAvatarUrl(res.data.image || ""); })
      .catch(console.error);
  }, []);

  const handleLogout = () => { localStorage.clear(); navigate("/"); window.location.reload(); };
  const isActive = (path) => location.pathname === path;

  // ── MOBILE ──
  if (isMobile) {
    return (
      <BottomNavigation
        value={mobileValue}
        onChange={(_, v) => setMobileValue(v)}
        sx={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: 60,
          borderTop: "1px solid #f3f4f6", zIndex: 999, bgcolor: "#fff",
          "& .MuiBottomNavigationAction-root": { minWidth: 0 },
        }}
      >
        {[
          { icon: <HomeRoundedIcon />, path: "/" },
          { icon: <ExploreRoundedIcon />, path: "/clarify/explore" },
          { icon: <AddCircleRoundedIcon sx={{ fontSize: 30, color: "#FF4500" }} />, path: "/clarify/create" },
          { icon: <SendRoundedIcon />, path: "/chat" },
          { icon: <AccountCircleRoundedIcon />, path: `/clarify/user/${user?.username}` },
        ].map((item, i) => (
          <BottomNavigationAction
            key={i}
            icon={item.icon}
            onClick={() => navigate(item.path)}
            sx={{ color: "#9ca3af", "&.Mui-selected": { color: "#FF4500" } }}
          />
        ))}
      </BottomNavigation>
    );
  }

  // ── DESKTOP ──
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        elevation: 0,
        sx: {
          top: `${NAVBAR_HEIGHT}px`,
          height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
          width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
          transition: "width 0.25s ease",
          borderRight: "1px solid #f3f4f6",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        },
      }}
    >
      {/* Toggle */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 min-h-[52px]">
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors cursor-pointer border-none bg-transparent"
        >
          <MenuRoundedIcon fontSize="small" />
        </button>
        {open && (
          <span className="text-sm font-semibold text-orange-500 whitespace-nowrap overflow-hidden">
            u/{username}
          </span>
        )}
      </div>

      <Divider sx={{ borderColor: "#f3f4f6" }} />

      {/* Main Nav */}
      <nav className="flex-1 py-2">
        {NAV_ITEMS.map((item) => (
          <Tooltip key={item.path} title={!open ? item.label : ""} placement="right" arrow>
            <Link to={item.path} className="no-underline block">
              <div className={`flex items-center gap-3 mx-2 my-0.5 px-2.5 py-2 rounded-xl cursor-pointer transition-colors text-sm font-medium overflow-hidden whitespace-nowrap
                ${isActive(item.path)
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className={`flex items-center shrink-0 ${isActive(item.path) ? "text-orange-500" : "text-gray-400"}`}>
                  {item.icon}
                </span>
                {open && item.label}
              </div>
            </Link>
          </Tooltip>
        ))}

        <div className="my-2 border-t border-gray-100" />

        {SECONDARY_ITEMS.map((item) => (
          <Tooltip key={item.path} title={!open ? item.label : ""} placement="right" arrow>
            <div
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 mx-2 my-0.5 px-2.5 py-2 rounded-xl cursor-pointer text-gray-400 hover:bg-gray-50 text-xs overflow-hidden whitespace-nowrap transition-colors"
            >
              <span className="flex items-center shrink-0">{item.icon}</span>
              {open && item.label}
            </div>
          </Tooltip>
        ))}
      </nav>

      {/* Profile */}
      <Divider sx={{ borderColor: "#f3f4f6" }} />
      <div className="p-2">
        <div
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Avatar
            src={avatarUrl}
            alt={username}
            sx={{ width: 30, height: 30, bgcolor: "#FF4500", fontSize: 12 }}
          >
            {username?.[0]?.toUpperCase()}
          </Avatar>
          {open && (
            <div className="min-w-0 overflow-hidden">
              <p className="text-xs font-semibold text-gray-900 truncate">u/{username}</p>
              <p className="text-[11px] text-gray-400">View profile</p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          elevation: 2,
          sx: { borderRadius: 2, minWidth: 160, border: "1px solid #f3f4f6" },
        }}
      >
        {
          !token ? null :
            <div>
              <MenuItem onClick={() => { setAnchorEl(null); navigate(`/clarify/user/${user?.username || username}`); }} sx={{ fontSize: 14, gap: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 0 }}><PersonRoundedIcon fontSize="small" /></ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem onClick={() => { setAnchorEl(null); navigate("/settings"); }} sx={{ fontSize: 14, gap: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 0 }}><SettingsRoundedIcon fontSize="small" /></ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { setAnchorEl(null); handleLogout(); }} sx={{ fontSize: 14, gap: 1.5, color: "#ef4444" }}>
                <ListItemIcon sx={{ minWidth: 0, color: "#ef4444" }}><LogoutRoundedIcon fontSize="small" /></ListItemIcon>
                Logout
              </MenuItem>
            </div>
        }
      </Menu>
    </Drawer>
  );
}