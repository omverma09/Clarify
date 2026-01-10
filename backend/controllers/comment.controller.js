import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      post: req.params.postId,
      user: req.user.id,
      text,
    });

    await Post.findByIdAndUpdate(req.params.postId, {
      $inc: { commentsCount: 1 },
    });

    const populatedComment = await comment.populate(
      "user",
      "username name image"
    );

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET COMMENTS
export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "username name image")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
