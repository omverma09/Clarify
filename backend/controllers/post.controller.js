import Post from "../models/post.model.js";
import User from "../models/user.model.js";

/* CREATE POST */
export const createPost = async (req, res) => {
   try {
    const post = await Post.create({
      user: req.user.id,
      content: req.body.content,
      link: req.body.link || "",
      image: req.file ? req.file.path : "",
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL POSTS (FEED) */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username image")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*  GET SINGLE POST  */
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username image"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE POST */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* Get posts of a user by ID */
export const getDashboardPostByUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ user: user._id })
      .populate("user", "username image")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const votePost = async (req, res) => {
  try {
    const { type } = req.body; // "up" or "down"
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // pehle purana vote hatao
    post.upvotes.pull(userId);
    post.downvotes.pull(userId);

    // naya vote add karo
    if (type === "up") post.upvotes.push(userId);
    if (type === "down") post.downvotes.push(userId);

    await post.save();

    res.json({
      upvotes: post.upvotes.length,
      downvotes: post.downvotes.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Vote failed" });
  }
};