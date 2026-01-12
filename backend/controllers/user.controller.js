import User from "../models/user.model.js";
import Post from "../models/post.model.js";

// Logged-in user jo hai uske liye.
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("name username email image banner bio badge followers following createdAt");

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Public profile ko check krna ho.
export const getUserByUsername = async (req, res) => {
  const profileUser = await User.findOne({ username: req.params.username })
    .select("-password")
    .populate("followers", "_id username image");

  if (!profileUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // 🔥 THIS LINE FIXES YOUR ISSUE
  const isFollowing = profileUser.followers.some(
    (f) => f._id.toString() === req.user.id
  );

  res.json({
    user: profileUser,
    isFollowing, // 👈 send this
    postCount: await Post.countDocuments({ user: profileUser._id }),
  });
};

// For update profile.
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, username, bio } = req.body;

    const updateData = { name, username, bio };

    // profile image
    if (req.files?.image) {
      updateData.image = req.files.image[0].path;
    }

    // banner image
    if (req.files?.banner) {
      updateData.banner = req.files.banner[0].path;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

//get logedin user k ke followers
export const getMyFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("followers", "username image");

    res.json({ followers: user.followers });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// For searching users
export const searchUsers = async (req, res) => {
  try {
    const q = req.query.q;

    console.log("Search query:", q);

    if (!q || q.trim() === "") {
      return res.status(200).json([]);
    }

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
      ],
    })
      .select("_id username name image")
      .limit(10);

    console.log("Users found:", users.length);
    return res.status(200).json(users);

  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};