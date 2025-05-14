// api/controllers/communitiesController.js
import Community from "../models/Community.js";
import User from "../models/User.js";
import mongoose from 'mongoose';


// @desc   Get all communities
// @route  GET /api/communities
export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().sort({ members: -1 });
    res.status(200).json(communities);

  } catch (err) {
    console.error("Error fetching communities:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const toggleMembership = async (req, res) => {
  const communityId = req.params.id;
  const userId      = req.user.id;

  // 1) Quick sanity checks
  if (!mongoose.isValidObjectId(communityId) || !mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid community or user ID." });
  }

  try {
    // 2) Load community and see if they’re already a member
    const community = await Community.findById(communityId).select('members');
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const isMember = community.members
      .some(memberId => memberId.toString() === userId);

    // 3) Prepare our atomic update operators (using the string IDs directly)
    const commUpdate = isMember
      ? { $pull: { members: userId } }
      : { $addToSet: { members: userId } };

    const userUpdate = isMember
      ? { $pull: { communities: communityId } }
      : { $addToSet: { communities: communityId } };

    // 4) Fire off both updates in parallel, asking for the “new” doc back each time
    const [updatedCommunity, updatedUser] = await Promise.all([
      Community.findByIdAndUpdate(
        communityId, 
        commUpdate, 
        { new: true, select: 'members' }
      ),
      User.findByIdAndUpdate(
        userId, 
        userUpdate, 
        { new: true, select: 'communities' }
      )
    ]);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // 5) Return only what the front-end needs
    return res.status(200).json({
      isMember:        !isMember,
      memberCount:     updatedCommunity.members.length,
      userCommunities: updatedUser.communities.map(c => c.toString())
    });
  } catch (err) {
    console.error("Error toggling membership:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


export const joinCommunity = async (req, res) => {
    const { communityId } = req.params;
    const { userId } = req.body;
  
    try {
      const community = await Community.findById(communityId);
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }
  
      // If the user is already a member, return a message (or you can handle this differently)
      if (community.members.includes(userId)) {
        return res.status(400).json({ error: "User already joined" });
      }
  
      // Add the userId to the members array
      community.members.push(userId);
      const updatedCommunity = await community.save();
      res.status(200).json(updatedCommunity);
    } catch (err) {
      console.error("Error joining community:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  };

// @desc   Create a new community
// @route  POST /api/communities
export const createCommunity = async (req, res) => {
  const { name, description, members, trending } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  try {
    const newCommunity = new Community({
      name,
      description,
      members: members || 0,
      trending: trending || false,
    });

    const saved = await newCommunity.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating community:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    res.status(200).json(community);
  } catch (err) { 
    console.error("Error fetching community:", err.message);
    res.status(500).json({ error: "Server error" });
  }

};

export const bulkGetCommunities = async (req, res) => {
  try {
    // Expect ?ids=comma,separated,list
    const idsParam = req.query.ids;
    if (!idsParam) {
      return res.status(400).json({ error: 'Missing ids query parameter' });
    }

    const ids = idsParam.split(',');
    // Find all communities whose _id is in the list
    const communities = await Community.find({ _id: { $in: ids } });
    return res.status(200).json(communities);
  } catch (err) {
    console.error('Error bulk‐fetching communities:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
