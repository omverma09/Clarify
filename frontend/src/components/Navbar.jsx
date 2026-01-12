import SearchIcon from "@mui/icons-material/Search";
import RedditIcon from "@mui/icons-material/Reddit";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios.js";

const Navbar = ({ size = 30 }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setUsers([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await API.get(`/users/search?q=${query}`);
        setUsers(res.data.users || res.data || []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You logged out ");
    navigate("/");
    window.location.reload();
  };

  const handleRegister = () => {
    navigate("/clarify/register");
  };

  return (
    <nav className="w-full h-14 bg-white border-b flex items-center px-4 gap-4 navbar relative">
      {/* Logo */}
      <div className="flex items-center gap-1 cursor-pointer">
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" fill="#FF4500" />
          <path
            d="M14 14h20c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4H22l-6 4v-4h-2c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4z"
            fill="white"
          />
          <path
            d="M24 18c-2.2 0-4 1.3-4 3h2c0-.7.9-1.5 2-1.5s2 .6 2 1.5c0 1.8-3 1.6-3 4h2c0-1.6 3-1.8 3-4 0-1.7-1.8-3-4-3zm-1 9h2v2h-2v-2z"
            fill="#FF4500"
          />
        </svg>
        <span className="text-xl font-bold text-[#1A1A1B] hidden sm:block">
          Clarify
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-xl flex items-center bg-[#F6F7F8] rounded-full px-4 py-2 border border-transparent hover:border-[#FF7A45] transition">
          <SearchIcon sx={{ color: "#878A8C", fontSize: 20 }} />
          <input
            type="text"
            placeholder="Find anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ml-2 w-full bg-transparent outline-none text-sm text-[#1A1A1B]"
          />
          {/* Dropdown */}
          {query && (
            <div className="absolute top-12 w-1/2 bg-white shadow-xl rounded-2xl z-50 max-h-80 overflow-y-auto border">
              {loading && (
                <p className="p-4 text-sm text-gray-500 text-center">
                  Searching...
                </p>
              )}

              {!loading && users.length === 0 && (
                <p className="p-4 text-sm text-gray-500 text-center">
                  No users found
                </p>
              )}

              {Array.isArray(users) &&
                users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => {
                      navigate(`clarify/user/${user.username}`);
                      setQuery("");
                      setUsers([]);
                    }}
                    className="
                      flex items-center gap-3 
                      px-4 py-3 
                      hover:bg-gray-100            
                      cursor-pointer
                      transition"                    
                    >
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-9 h-9 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}

        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex items-center gap-3">
        <button className="nav-btn text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100">
          Ask
        </button>

        <button className="nav-btn text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100">
          Get App
        </button>

        {token ? (
          <button
            className="text-sm font-semibold px-5 py-1.5 rounded-full bg-[#FF4500] text-white hover:bg-[#E03D00]"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <button
            className="text-sm font-semibold px-5 py-1.5 rounded-full bg-[#FF4500] text-white hover:bg-[#E03D00]"
            onClick={handleRegister}
          >
            Register
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="sm:hidden">
        <MenuIcon
          className="cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-14 right-4 w-48 bg-white border rounded-lg shadow-lg flex flex-col gap-2 p-3 sm:hidden z-50">

          <button className="nav-btn text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            Ask
          </button>

          <button className="nav-btn text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            Get App
          </button>

          {token ? (
            <button
              className="text-sm font-semibold px-5 py-1.5 rounded-full bg-[#FF4500] text-white hover:bg-[#E03D00] transition"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <button
              className="text-sm font-semibold px-5 py-1.5 rounded-full bg-[#FF4500] text-white hover:bg-[#E03D00] transition"
              onClick={handleRegister}
            >
              Register
            </button>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;