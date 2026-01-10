import express from "express";
import { toggleFollow } from "../controllers/follow.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/:userId", protect, toggleFollow);

export default router;
