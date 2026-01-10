import { useState, useEffect } from "react";
import API from "../api/axios.js";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    API.get("/users/me/followers")
      .then((res) => {
        setFollowers(res.data.followers);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6 right-container">
      <h3 className="font-semibold mb-4 text-gray-800">
        Message your followers...
      </h3>

      <div className="space-y-4">
        {followers.map((user) => (
          <Link className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
            <img
              src={user.image || "/default-avatar.png"}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div> 
              <p className="font-medium text-sm form">
                @{user.username}
              </p>
            </div>
          </Link>
        ))}

        {followers.length === 0 && (
          <p className="text-sm text-gray-500">
            No followers yet
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
