import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import EditProfileForm from "./EditProfileForm";

const EditProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${username}`);
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p>User not found</p>;

  return <EditProfileForm user={user} />;
};

export default EditProfile;