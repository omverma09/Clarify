import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext .jsx";
import CommentInput from "./CommentInput.jsx";
import Snackbar from "@mui/material/Snackbar";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";

const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const PostCard = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes.length);
  const [downvotes, setDownvotes] = useState(post.downvotes.length);
  const [voteState, setVoteState] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const score = upvotes - downvotes;

  const requireLogin = () => {
    if (!user) { navigate("/clarify/login"); return false; }
    return true;
  };

  const handleVote = async (type) => {
    if (!requireLogin()) return;
    try {
      const res = await API.post(`/posts/${post._id}/vote`, { type });
      setUpvotes(res.data.upvotes);
      setDownvotes(res.data.downvotes);
      setVoteState((prev) => (prev === type ? null : type));
    } catch {
      console.error("Vote failed");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
    setSnackbar(true);
  };

  return (
    <>
      <article className="bg-white border border-gray-200 rounded-xl mb-3 hover:border-gray-300 transition-colors overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 pt-3 pb-2">
          <Link to={user ? `/clarify/user/${post.user.username}` : "/clarify/login"}>
            <img
              src={post.user.image || "/default-avatar.png"}
              alt={post.user.username}
              className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0"
            />
          </Link>
          <div className="min-w-0">
            <Link
              to={user ? `/clarify/user/${post.user.username}` : "/clarify/login"}
              className="text-sm font-semibold text-gray-900 hover:underline block"
            >
              u/{post.user.username}
            </Link>
            <span className="text-xs text-gray-400">{timeAgo(post.createdAt)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-2">
          <p className="text-[15px] font-medium text-gray-900 leading-snug">
            {post.content}
          </p>
        </div>

        {/* Image */}
        {post.image && (
          <div className="bg-gray-50">
            <img
              src={post.image}
              alt="post"
              className="w-full max-h-[480px] object-cover block"
            />
          </div>
        )}

        {/* Link */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 mx-4 mb-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-blue-600 hover:bg-gray-100 transition-colors truncate"
          >
            <LinkRoundedIcon style={{ fontSize: 14, flexShrink: 0 }} />
            <span className="truncate">{post.link}</span>
          </a>
        )}

        {/* Action Bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-t border-gray-100">

          {/* Vote */}
          <div className="flex items-center gap-0.5 bg-gray-100 rounded-full px-2 py-1">
            <button
              onClick={() => handleVote("up")}
              className={`p-0.5 rounded-full transition-colors cursor-pointer ${voteState === "up" ? "text-orange-500" : "text-gray-500 hover:text-orange-500"}`}
            >
              <ArrowUpwardRoundedIcon style={{ fontSize: 18 }} />
            </button>
            <span className={`text-xs font-bold px-1 min-w-[20px] text-center ${voteState === "up" ? "text-orange-500" : voteState === "down" ? "text-indigo-500" : "text-gray-700"}`}>
              {score}
            </span>
            <button
              onClick={() => handleVote("down")}
              className={`p-0.5 rounded-full transition-colors cursor-pointer ${voteState === "down" ? "text-indigo-500" : "text-gray-500 hover:text-indigo-500"}`}
            >
              <ArrowDownwardRoundedIcon style={{ fontSize: 18 }} />
            </button>
          </div>

          {/* Comments */}
          <button
            onClick={() => { if (!requireLogin()) return; setShowComment((p) => !p); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 hover:bg-gray-100 text-xs font-medium transition-colors cursor-pointer"
          >
            <ChatBubbleOutlineRoundedIcon style={{ fontSize: 16 }} />
            <span>{post.commentsCount}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 hover:bg-gray-100 text-xs font-medium transition-colors cursor-pointer"
          >
            <ShareRoundedIcon style={{ fontSize: 16 }} />
            <span>Share</span>
          </button>
        </div>

        {/* Comment Input */}
        {showComment && (
          <div className="px-4 pb-4 pt-1 border-t border-gray-100">
            <CommentInput postId={post._id} />
          </div>
        )}
      </article>

      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        onClose={() => setSnackbar(false)}
        message="Link copied!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default PostCard;