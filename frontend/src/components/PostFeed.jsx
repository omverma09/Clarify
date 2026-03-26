import { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "./PostCard";
import API from "../api/axios";
import PostSkeleton from "./loadingCompos/FeedLoader.jsx";
import Loader from "./loadingCompos/Loader.jsx";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const observer = useRef();

  // Infinite Scroll Observer
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch Posts
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/posts?page=${page}&limit=3`);

      setPosts((prev) => [...prev, ...res.data.posts]);
      setHasMore(res.data.hasMore);
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  // Initial Loading UI
  if (initialLoading) {
    return (
      <div className="w-full py-6 text-center text-black-500">
        <Loader />
        <PostSkeleton />
      </div>
    );
  }

  // Error UI
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
        posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostRef} key={post._id}>
                <PostCard post={post} />
              </div>
            );
          }
          return <PostCard key={post._id} post={post} />;
        })
      )}

      {/* Bottom Loader */}
      {loading && !initialLoading && (
        <div className="text-center py-4">
          <Loader />
        </div>
      )}

      {/* No More Posts */}
      {!hasMore && (
        <p className="text-center text-gray-500 py-4">
          No more posts to show
        </p>
      )}
    </div>
  );
};

export default PostFeed;