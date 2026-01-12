import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import API from "../api/axios";
import PostSkeleton from "./loadingCompos/FeedLoader.jsx"
import Loader from "./loadingCompos/Loader.jsx";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        setError("Failed to load posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-6 text-center text-black-500">
        <Loader/>
        <PostSkeleton/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default PostFeed;
