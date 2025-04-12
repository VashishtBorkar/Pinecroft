import User from '../models/User.js';

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("username profilePicture"); // 👈 only public fields

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserPosts = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const posts = await Post.find({ author: userId })
        .sort({ createdAt: -1 })
        .populate("author", "username profilePicture");
  
      res.status(200).json({ posts });
    } catch (err) {
      console.error("Error getting user posts:", err);
      res.status(500).json({ error: "Failed to fetch user posts" });
    }
  };
  