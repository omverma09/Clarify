import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserprofileLayout from "./Layout/UserprofileLayout.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import EditProfile from "./components/Editprofile.jsx";
import CreatePost from "./components/CreatePost.jsx";

function App() {
  return (
    <Routes>
      <Route >
        <Route path="/" element={<MainLayout />} />
        <Route path="/clarify/login" element={<Login />} />
        <Route path="/clarify/register" element={<Register />} />
        <Route element={<UserprofileLayout />}>
        <Route path="/clarify/user/:username" element={<UserProfilePage />} />
        <Route path="/clarify/user/:username/edit" element={<EditProfile />} />
        <Route path="/clarify/user/:username/post-something" element={<CreatePost />} />
        
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
