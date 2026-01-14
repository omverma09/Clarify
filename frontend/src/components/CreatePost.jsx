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

            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto mt-6 bg-white p-6 rounded-lg shadow form"
            >
                <h2 className="form fs-6 text-gray-600 mb-2">
                    Post Something...
                </h2>
                {/* POST CONTENT */}
                <div className="mb-4">
                    <textarea
                        placeholder="Post Description..."
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-black rounded px-3 py-2 resize-none text-gray-600 focus:outline-none"
                    />
                </div>

                {/* EXTERNAL LINK */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="External link (optional)"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full border border-black rounded px-3 py-2 text-gray-600 focus:outline-none"
                    />
                </div>

                {/* IMAGE UPLOAD */}
                <div className="mb-5">
                    <label className="flex items-center justify-between border-2 border-dashed border-black rounded-lg p-4 cursor-pointer">
                        <span className="text-sm text-gray-500">
                            {image ? image.name : "Click to upload image"}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                            Browse
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* BUTTON */}
                <div className="flex justify-end">
                    <button
                        disabled={loading}
                        className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CreatePost;