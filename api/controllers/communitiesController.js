import Community from "../models/Community.js";
import User from "../models/User.js";
import mongoose from 'mongoose';

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

  if (!mongoose.isValidObjectId(communityId) || !mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid community or user ID." });
  }

  try {

    const community = await Community.findById(communityId).select('members');
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const isMember = community.members
      .some(memberId => memberId.toString() === userId);

    // Atomic updates using IDs directly
    const commUpdate = isMember
      ? { $pull: { members: userId } }
      : { $addToSet: { members: userId } };

    const userUpdate = isMember
      ? { $pull: { communities: communityId } }
      : { $addToSet: { communities: communityId } };

    // Update in parallel for atomicity
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
  
      if (community.members.includes(userId)) {
        return res.status(400).json({ error: "User already joined" });
      }

      community.members.push(userId);
      const updatedCommunity = await community.save();
      res.status(200).json(updatedCommunity);
    } catch (err) {
      console.error("Error joining community:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  };

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
