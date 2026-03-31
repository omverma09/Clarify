import express from "express";
import { getMessages, getConversations, markAsRead } from "../controllers/chat.controller.js";
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/conversations', protect, getConversations);
router.get('/messages/:userId', protect, getMessages);
router.put('/mark-read/:userId', protect, markAsRead); // For mark as read

export default router;