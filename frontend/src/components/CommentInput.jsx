import { useEffect, useState } from "react";
import API from "../api/axios.js";
import CommentItem from "../components/CommentItem.jsx";
import EditNoteIcon from '@mui/icons-material/EditNote';

const CommentInput = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const fetchComments = async () => {
        const res = await API.get(`/comments/${postId}`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const res = await API.post(`/comments/${postId}`, { text });
        setComments([res.data, ...comments]);
        setText("");

    };

    return (
        <div className="mt-3 border-t pt-3">
            {/* INPUT */}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div >
                    <EditNoteIcon />
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring"
                    />
                </div>
            </form>

            {/* LIST */}
            <div className="mt-3 border-t pt-3 bg-gray-50 rounded-lg p-3">
                {comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default CommentInput;
