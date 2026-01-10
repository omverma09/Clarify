import { useState } from "react";
import API from "../api/axios.js";

const FollowBtn = ({ userId, isFollowingInitial }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setLoading(true);
      const res = await API.put(`/follow/${userId}`);
      setIsFollowing(res.data.isFollowing);
    } catch (err) {
      console.error("Follow failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition
        ${isFollowing
          ? "bg-gray-200 text-gray-700"
          : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowBtn;