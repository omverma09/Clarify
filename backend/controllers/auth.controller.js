import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/* TOKEN GENERATOR  */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* REGISTER */
export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist)
    return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Registered successfully",
    user,
  });
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