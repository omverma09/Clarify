import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Import Routes
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import followRoutes from "./routes/follow.route.js";
import chatRoutes from "./routes/chat.routes.js";

// Import Socket Handler
import { initializeSocket } from "./sockets/chat.socket.js";

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ROUTES
// Public Test Route
app.get("/", (req, res) => {
  res.send("Backend is Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/chat", chatRoutes);

// DATABASE CONNECTION
const MONGO_URI = process.env.Mongoose_URI || process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// SERVER SETUP
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize Socket.io for Chat
initializeSocket(io);

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.io is ready for real-time chat`);
});

// Graceful Shutdown (Best Practice)
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});