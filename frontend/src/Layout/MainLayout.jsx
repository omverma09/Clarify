import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Feed from "../pages/Feed";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex max-w-[1200px] mx-auto pt-14">
        <LeftSidebar />

        <main className="flex-1 min-w-0 px-4">
          <Feed />
        </main>

        <div className="hidden md:block pr-4">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;