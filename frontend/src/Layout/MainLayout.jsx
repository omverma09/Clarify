import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Feed from "../pages/Feed";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <div className="layout main-content bg-gray-100">
        <LeftSidebar />
        <div className="center-content">
          <Feed />
        </div>
        <RightSidebar/>
      </div>
    </>
  );
};

export default MainLayout;
