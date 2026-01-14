import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ user }) => {
  const [form, setForm] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
  });

  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("username", form.username);
      formData.append("bio", form.bio);
      if (image) formData.append("image", image);
      if (banner) formData.append("banner", banner);

      await API.put("/users/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-gray-800 max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      {/* NAME */}
      <div className="mb-4 text-gray-800">
        <label className="block text-sm font-medium mb-1 text-gray-800">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* USERNAME */}
      <div className="mb-4 text-gray-800">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* BIO */}
      <div className="mb-6 text-gray-800">
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows="3"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* PROFILE IMAGE */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          Profile Image
        </label>

        <label className="flex items-center justify-between border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-orange-500">
          <span className="text-sm text-gray-600">
            {image ? image.name : "Click to upload profile image"}
          </span>
          <span className="text-orange-500 font-medium text-sm">
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

      {/* BANNER IMAGE */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Banner Image
        </label>

        <label className="flex items-center justify-between border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-orange-500">
          <span className="text-sm text-gray-600">
            {banner ? banner.name : "Click to upload banner image"}
          </span>
          <span className="text-orange-500 font-medium text-sm">
            Browse
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBanner(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfileForm;