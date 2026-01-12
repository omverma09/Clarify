import express from "express";
import { getUserByUsername, getMe, updateProfile, getMyFollowers, searchUsers } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../config/cloudinary.config.js";

const router = express.Router();

// logged-in user profile
router.get("/me", protect, getMe);
router.get("/search", searchUsers);

//logged in user ke followers
router.get("/me/followers", protect, getMyFollowers);

// public profile
router.get("/:username", protect, getUserByUsername);

// Profile update ke liye. if (req.user.id  == profile._id) Owner hoga
router.put("/profile/update", protect, upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
]), updateProfile);


export default router;
