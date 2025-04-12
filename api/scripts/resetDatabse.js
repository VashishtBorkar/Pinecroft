import mongoose from "mongoose";
import Post from "./models/Post.js";
import User from "./models/User.js";
import Comment from "./models/Comment.js";

// This will delete all documents from each collection
async function resetDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Pinecroft");

    await Post.deleteMany({});
    await User.deleteMany({});
    await Comment.deleteMany({});

    console.log("✅ All posts, users, and comments deleted.");
    process.exit(0);
  } catch (err) {
    console.error("Error resetting DB:", err);
    process.exit(1);
  }
}

resetDatabase();
