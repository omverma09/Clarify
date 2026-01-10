import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ user }) => {
  const [form, setForm] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
  });
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

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
      window.location.reload();
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
      className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow form"
    >
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      {/* NAME */}
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-2 mb-3 rounded"
      />

      {/* USERNAME */}
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full border p-2 mb-3 rounded"
      />

      {/* BIO */}
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="w-full border p-2 mb-3 rounded"
      />

      {/* PROFILE IMAGE */}
      <label className="block mb-2 text-sm font-medium">
        Profile Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />

      {/* BANNER */}
      <label className="block mb-2 text-sm font-medium">
        Banner Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setBanner(e.target.files[0])}
        className="mb-4"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfileForm;