import User from '../models/User.js';
import { Post, Comment } from '../models/Post.js';

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
    .select("username profilePicture followers communities") // 👈 only public fields
    .populate("followers", "_id username profilePicture")
    .populate("communities", "_id name members");

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

  export const followUser = async (req, res) => {
    const currentUserId = req.user.id;
    const targetUserId = req.params.id;
  
    if (currentUserId === targetUserId) {
      return res.status(400).json({ error: "You can't follow yourself" });
      
    }
  
    try {
      const targetUser = await User.findById(targetUserId);
      const currentUser = await User.findById(currentUserId);
  
      if (!targetUser.followers.includes(currentUserId)) {
        targetUser.followers.push(currentUserId);
        currentUser.following.push(targetUserId);
      } else {
        targetUser.followers.pull(currentUserId);
        currentUser.following.pull(targetUserId);
      }
  
      await targetUser.save();
      await currentUser.save();
  
      res.status(200).json({ 
        message: "Follow status updated", 
        followers: targetUser.followers
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to update follow status" });
    }
  };

  // controllers/userController.js
export const searchUsers = async (req, res) => {
  try {
    const q = req.query.q || '';
    const users = await User.find({ username: { $regex: q, $options: 'i' } })
      .select('_id username profilePicture')
      .limit(10);
    res.json(users);
  } catch (err) {
    console.error('Error searching users:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


  

  
  