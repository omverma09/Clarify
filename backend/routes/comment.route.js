import express from "express";
import { addComment, getPostComments } from "../controllers/comment.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:postId", protect, addComment);
router.get("/:postId", getPostComments);

export default router;