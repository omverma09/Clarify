import { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "./PostCard";
import API from "../api/axios";
import PostSkeleton from "./loadingCompos/FeedLoader.jsx";
import Loader from "./loadingCompos/Loader.jsx";

import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const SORT_OPTIONS = [
  { label: "Hot", icon: <WhatshotRoundedIcon style={{ fontSize: 15 }} /> },
  { label: "New", icon: <AccessTimeRoundedIcon style={{ fontSize: 15 }} /> },
  { label: "Top", icon: <AutoAwesomeRoundedIcon style={{ fontSize: 15 }} /> },
];

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("Hot");

  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage((p) => p + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/posts?page=${page}&limit=5`);
      setPosts((prev) => [...prev, ...res.data.posts]);
      setHasMore(res.data.hasMore);
    } catch {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, [page]);

  if (initialLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-5">
        <PostSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 text-sm mb-4">{error}</p>
        <button
          onClick={() => { setError(""); setInitialLoading(true); fetchPosts(); }}
          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-20">

      {/* Sort Bar */}
      <div className="flex gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 mb-4">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setSortBy(opt.label)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer
              ${sortBy === opt.label
                ? "bg-orange-50 text-orange-500 font-semibold"
                : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No posts yet. Be the first to post!
        </div>
      ) : (
        posts.map((post, index) => (
          <div key={post._id} ref={index === posts.length - 1 ? lastPostRef : null}>
            <PostCard post={post} />
          </div>
        ))
      )}

      {/* Pagination Loader */}
      {loading && !initialLoading && (
        <div className="text-center py-4">
          <Loader />
        </div>
      )}

      {/* End of Feed */}
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-400 text-xs py-6 border-t border-gray-100 mt-2">
          You've seen all posts for now
        </p>
      )}
    </div>
  );
};

export default PostFeed;