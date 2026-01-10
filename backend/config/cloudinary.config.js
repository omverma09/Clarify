import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Clarify-Images", // cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

// multer middleware
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

export default upload;