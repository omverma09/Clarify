import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function UserprofileLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        {/* LEFT SIDEBAR */}
        <div className="hidden md:block w-64">
          <LeftSidebar />
        </div>

        {/* CENTER CONTENT */}
        <div className="flex-1 p-6 pr-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
