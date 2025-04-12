import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  edited: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now}
});

const PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: false }, // Optional community
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // List of references to comments
    createdAt: { type: Date, default: Date.now}
});

export const Post = mongoose.model("Post", PostSchema);
export const Comment = mongoose.model("Comment", CommentSchema);
