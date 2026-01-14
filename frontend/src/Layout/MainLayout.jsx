import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Feed from "../pages/Feed";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <div className="app layout main-content bg-gray-100">
        <div className="left">
          <LeftSidebar />
        </div>
        <div className="flex-1">
          <Feed />
        </div>
        <div className="right hidden sm:flex">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
