import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import FollowersLoading from "./loadingCompos/FollowersLoading.jsx";

const RightSidebar = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/me/followers")
      .then((res) => setFollowers(res.data.followers || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const displayed = showAll ? followers : followers.slice(0, 8);

  if (loading) {
    return (
      <aside className="w-68 min-w-[272px] py-4">
        <FollowersLoading />
      </aside>
    );
  }

  return (
    <aside className="w-[272px] min-w-[272px] py-4 flex flex-col gap-3">

      {/* Community Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="h-14 bg-gradient-to-br from-orange-500 to-orange-400" />
        <div className="p-4 flex flex-col gap-2.5">
          <h3 className="text-sm font-bold text-gray-900">Welcome to Clarify</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Your space to ask, share, and discuss ideas with a growing community.
          </p>
          <button
            onClick={() => navigate(`/clarify/user/${user?.username}/post-something`)}
            className="mt-1 w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors"
          >
            Create Post
          </button>
        </div>
      </div>

      {/* Followers */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
            Followers
            {followers.length > 0 && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                {followers.length}
              </span>
            )}
          </h3>
          {followers.length > 8 && (
            <button
              onClick={() => setShowAll((p) => !p)}
              className="text-xs text-orange-500 font-medium hover:underline"
            >
              {showAll ? "Show less" : "See all"}
            </button>
          )}
        </div>

        {followers.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-5">No followers yet</p>
        ) : (
          <div className="flex flex-col gap-0.5">
            {displayed.map((u) => (
              <div
                key={u._id}
                onClick={() => navigate(`/clarify/user/${u.username}`)}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <img
                  src={u.image || "/default-avatar.png"}
                  alt={u.username}
                  className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">u/{u.username}</p>
                  {u.name && <p className="text-xs text-gray-400 truncate">{u.name}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-[11px] text-gray-300 text-center leading-relaxed">
        Clarify © 2025 · Privacy · Terms · Help
      </p>
    </aside>
  );
};

export default RightSidebar;