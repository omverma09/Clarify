import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from "react-router-dom";

import DashboardAnalytics from "./DashboardAnalytics";
import DashboardPosts from "./DashboardPosts";
import FollowBtn from "./FollowBtn";
import MessageBtn from "./MessageBtn";
import Loader from "./loadingCompos/Loader.jsx";
import ProfileLoader from "./loadingCompos/ProfileLoader.jsx"

export default function DashboardProfile() {
  const style = {
    color: "rgb(47, 47, 47)"
  }

  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = loggedInUser?._id === user?._id;

  useEffect(() => {
    API.get(`/users/${username}`)
      .then((res) => {
        setUser({
          ...res.data.user,
          isFollowing: res.data.isFollowing, // 👈 IMPORTANT
        });
        setPostCount(res.data.postCount);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [username]);
  if (loading) {
    return (
      <div className="w-full py-6 text-center text-black-500">
        <Loader />
        <ProfileLoader />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow mt-16 ml-7">
        <div className="h-48 relative">
          <img src={user.banner} alt="banner"
            className="w-full h-full object-cover rounded-t-lg "
          />

          <img src={user.image} alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white absolute -bottom-16 left-6"
          />
        </div>

        <div className="pt-20 px-6 pb-6 ">
          <h1 className="text-2xl font-bold user-detail" style={style}>{user.name}</h1>
          <p className="text form" style={style}>@{user.username}</p>

          <p className="mt-3 text-black-600" style={style}>{user.bio}</p>

          <div className="flex gap-6 mt-4 text-sm user-detail" style={style}>
            <span>
              <b>{user?.followers?.length || 0}</b> Followers
            </span>
            <span>
              <b>{user?.following?.length || 0}</b> Following
            </span>
            <span>
              <b>{postCount || 0}</b> Posts
            </span>

            {isOwner && (
              <div>

                <button className="hidden sm:block text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition nav-btn"
                  onClick={() => navigate(`/clarify/user/${user.username}/edit`)}
                >
                  <EditIcon />
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          {isOwner && (
            <div>

              <button className="hidden sm:block text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition nav-btn"
                onClick={() => navigate(`/clarify/user/${user.username}/post-something`)}
              >
                <AddPhotoAlternateIcon />
                Post somet..
              </button>
            </div>
          )}
          <div className="flex items-center gap-6 mt-6"> {/* Yeh Tailwind se same line + spacing */}
            {!isOwner && (
              <>
                <FollowBtn
                  userId={user._id}
                  isFollowingInitial={user.isFollowing}   // 👈 backend se aaya hua
                />
                <MessageBtn />
              </>
            )}
          </div>
        </div>
        {isOwner && <DashboardAnalytics postcount={postCount} />}

        <DashboardPosts />

      </div>
    </>
  );
}
