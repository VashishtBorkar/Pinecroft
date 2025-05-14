import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    ticker: {type: String, required: true, unique: true},
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // List of user IDs
    createdAt: { type: Date, default: Date.now }
});

const Community = mongoose.model('Community', CommunitySchema);
export default Community;

