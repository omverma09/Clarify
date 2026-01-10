import { useState } from "react";
import API from "../api/axios.js";

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        if (!content.trim()) return;

        const formData = new FormData();
        formData.append("content", content);
        formData.append("link", link);
        if (image) formData.append("image", image);

        try {
            setLoading(true);

            const res = await API.post("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Post created successful");
            onPostCreated?.();
            setContent("");
            setLink("");
            setImage(null);
        } catch (err) {
            alert("Invalid credintials");
            console.error("Post failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-20">
            <h2 className="form fs-6">Post Something...</h2>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow form">

                <textarea
                    placeholder="Post Description..."
                    className="w-full border rounded p-2 resize-none focus:outline-none focus:ring"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="External link (optional)"
                    className="w-full border rounded p-2 resize-none focus:outline-none focus:ring mt-4"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full text-sm mt-3"
                />

                <div className="flex justify-end">
                    <button
                        disabled={loading}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;