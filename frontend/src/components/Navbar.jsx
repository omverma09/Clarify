import SearchIcon from "@mui/icons-material/Search";
import RedditIcon from "@mui/icons-material/Reddit";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
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
        <RedditIcon sx={{ color: "#FF4500", fontSize: 32 }} />
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
            className="ml-2 w-full bg-transparent outline-none text-sm text-[#1A1A1B]"
          />
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