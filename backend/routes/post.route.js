import express from "express";
import { createPost, getAllPosts, getSinglePost, deletePost, getDashboardPostByUser, votePost} from "../controllers/post.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../config/cloudinary.config.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.delete("/:id", protect, deletePost);
router.get("/username/:username", getDashboardPostByUser);
router.post("/:id/vote", protect, votePost);

export default router;
