import { useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext .jsx";
import { useNavigate } from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import CommentInput from "./CommentInput.jsx";
import Alert from '@mui/material/Alert';


const PostCard = ({ post }) => {

  const [upvotes, setUpvotes] = useState(post.upvotes.length);
  const [downvotes, setDownvotes] = useState(post.downvotes.length);
  const [showComment, setShowComment] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const requireLogin = () => {
    if (!user) {
      navigate("/clarify/login");
      return false;
    }
    return true;
  };


  const score = upvotes - downvotes;

  const handleVote = async (type) => {
    try {
      const res = await API.post(`/posts/${post._id}/vote`, {
        type,
      });
      console.log(res);

      setUpvotes(res.data.upvotes);
      setDownvotes(res.data.downvotes);
    } catch (err) {
      <Alert severity="error">Vote failed</Alert>
      console.error("Vote failed");
    }
  };


  return (
    <div className="bg-white border rounded-lg mb-6 hover:border-gray-300 transition">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            <img
              src={post.user.image || "/default-avatar.png"}
              alt="profile"
              className="w-7 h-7 rounded-full object-cover"
            />
          </div>
          <span className="font-semibold username">
            <Link to={user ? `/clarify/user/${post.user.username}` : "/clarify/login"}>
              @{post.user.username}
            </Link>
          </span>
          <span className="text-gray-500 date">
            • {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        <MoreHorizIcon className="text-gray-500 cursor-pointer" />
      </div>

      {/* Content */}
      <h2 className="px-4 text-lg font-semibold mb-2 description">
        {post.content}
      </h2>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full max-h-[500px] object-cover p-8"
        />
      )}

      {/* Link */}
      {post.link && (
        <a
          href={post.link}
          target="_blank"
          rel="noreferrer"
          className="block px-4 py-2 text-blue-600 hover:underline"
        >
          {post.link}
        </a>
      )}

      {/* Actions */}
      <div className="flex items-center gap-8 px-4 py-3 text-sm text-gray-600">
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
          <ArrowUpwardIcon
            onClick={() => {
              if (!requireLogin()) return;
              handleVote("up")
            }}
            className="cursor-pointer hover:text-orange-500"
          />

          <span className="font-medium">{score}</span>

          <ArrowDownwardIcon
            onClick={() => {
              if (!requireLogin()) return;
              handleVote("down")
            }}
            className="cursor-pointer hover:text-blue-500"
          />
        </div>

        <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-full cursor-pointer"
          onClick={() => setShowComment(!showComment)}
        >
          <ChatBubbleOutlineIcon
            onClick={() => {
              if (!requireLogin()) return;
              setShowComment(true);
            }}
          />
          <span>{post.commentsCount}</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-full cursor-pointer">
          <ShareIcon />
          <span>Share</span>
        </div>
      </div>
      {showComment && (
        <div className="px-4 pb-4 form">
          <CommentInput postId={post._id} />
        </div>
      )}

    </div>
  );
};

export default PostCard;