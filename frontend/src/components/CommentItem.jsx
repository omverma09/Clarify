import { Link } from "react-router-dom";

const CommentItem = ({ comment }) => {
  return (
    <div className="flex gap-3">
      <img
        src={comment.user.image}
        className="w-8 h-8 rounded-full"
        alt="user"
      />

      <div className="bg-gray-100 px-3 py-2 rounded-lg w-full">
        <Link
          to={`/clarify/user/${comment.user.username}`}
          className="text-sm font-semibold hover:underline"
        >
          {comment.user.name}
        </Link>

        <p className="text-sm text-gray-700">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;