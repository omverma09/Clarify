import { AuthProvider } from "./context/AuthContext .jsx";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout.jsx";
import UserprofileLayout from "./Layout/UserprofileLayout.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import EditProfile from "./components/Editprofile.jsx";
import CreatePost from "./components/CreatePost.jsx";

import HelpPage from "./components/help/HelpHomepage.jsx";
import BestOfClarify from "./components/BestOfClarify/BestOfClarify.jsx";
import AboutClarify from "./components/AboutUs/AboutClarify.jsx";
import AdvertisingHome from "./components/Advertising/AdvertisingHome.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/clarify/login" element={<Login />} />
        <Route path="/clarify/register" element={<Register />} />
        <Route path="/clarify/verify-otp" element={<VerifyOtp />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserprofileLayout />}>
            <Route path="/clarify/user/:username" element={<UserProfilePage />} />
            <Route path="/clarify/user/:username/edit" element={<EditProfile />} />
            <Route path="/clarify/user/:username/post-something" element={<CreatePost />} />

            <Route path="/clarify/help" element={<HelpPage />} />
            <Route path="/clarify/out-best" element={<BestOfClarify />} />
            <Route path="/clarify/about-us" element={<AboutClarify />} />
            <Route path="/clarify/advertising" element={<AdvertisingHome />} />
          </Route>
          
        </Route>
         <Route path="*" element={<NotFound/>}/>

      </Routes>
    </AuthProvider>
  );
}

export default App;