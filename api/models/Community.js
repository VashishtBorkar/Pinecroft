import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Unique community name
    description: { type: String, required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The user who created the community
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of user IDs
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // List of post IDs
    createdAt: { type: Date, default: Date.now }
});

const Community = mongoose.model('Community', CommunitySchema);
export default Community;
