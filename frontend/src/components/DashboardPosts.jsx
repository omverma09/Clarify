import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";

const DashboardPosts = ({ userId }) => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchUserPosts = async () => {
      try {
        const res = await API.get(`/posts/username/${username}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load user posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [username]);

  if (loading)
    return <p className="mt-6 text-center text-gray-500">Loading posts...</p>;

  if (!posts || posts.length === 0)
    return <p className="mt-6 text-center text-gray-400">No posts yet</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Your posts...</h1>
      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>

  );
};

export default DashboardPosts;