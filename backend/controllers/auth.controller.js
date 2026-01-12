import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import otpStore from "../config/otpStore.js";
import transporter from "../config/mail.js";
import { v4 as uuidv4 } from "uuid";

/* TOKEN GENERATOR  */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* REGISTER */
export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already exists" });

    // const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const tempId = uuidv4();

    otpStore.set(tempId, {
      otp,
      name,
      username,
      email,
      password,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Clarify - Email Verification",
      html: `<h3>Your OTP is</h3><h1>${otp}</h1> <br> <h3>Expired in 5 minutes : </h3>`,
    });

    res.status(200).json({
      message: "OTP sent to email",
      tempId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* 🔹 VERIFY OTP */
export const verifyOtp = async (req, res) => {
  try {
    const { tempId, otp } = req.body;

    const tempUser = otpStore.get(tempId);
    if (!tempUser)
      return res.status(400).json({ message: "OTP expired" });

    if (tempUser.expiresAt < Date.now()) {
      otpStore.delete(tempId);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (tempUser.otp !== Number(otp))
      return res.status(400).json({ message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(tempUser.password, 10);

    const newUser = await User.create({
      name: tempUser.name,
      username: tempUser.username,
      email: tempUser.email,
      password: hashedPassword,
    });

    otpStore.delete(tempId);

    res.status(201).json({
      message: "Email verified & user registered",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* LOGIN */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
      user
    });
  } catch (error) {
    console.log(error);
  }
};

/* Logout */
export const logoutUser = async (req, res) => {
  res.json({
    message: "Logout successful (clear token from frontend)",
  });
};