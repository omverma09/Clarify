import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import Loader from "./loadingCompos/Loader.jsx";
import FollowersLoading from "./loadingCompos/FollowersLoading.jsx";

const RightSidebar = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllFollowers, setShowAllFollowers] = useState(false);

  const navigate = useNavigate();

  // Fetch Recent Chats + Followers
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Followers
        const followersRes = await API.get("/users/me/followers");
        setFollowers(followersRes.data.followers || []);

      } catch (err) {
        console.error("Error fetching sidebar data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedFollowers = showAllFollowers
    ? followers
    : followers.slice(0, 10);

  const hasMoreFollowers = followers.length > 10;

  if (loading) {
    return (
      <div className="w-full py-6 text-center">
        <Loader />
        <FollowersLoading />
      </div>
    );
  }

  return (
    <div className="hidden md:block bg-white rounded-xl p-5 mt-6 shadow-sm border border-gray-100 right-container h-[600px] overflow-y-auto ">

      {/* FOLLOWERS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-gray-800">Followers</h3>
          {hasMoreFollowers && (
            <button
              onClick={() => setShowAllFollowers(!showAllFollowers)}
              className="text-orange-600 text-sm font-medium hover:underline"
            >
              {showAllFollowers ? "See Less" : "See More"}
            </button>
          )}
        </div>

        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
          {displayedFollowers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all active:scale-[0.98]"
            >
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">@{user.username}</p>
                {user.name && <p className="text-xs text-gray-500">{user.name}</p>}
              </div>
            </div>
          ))}

          {followers.length === 0 && (
            <p className="text-sm text-gray-500 py-8 text-center">
              No followers yet. Start following people!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;