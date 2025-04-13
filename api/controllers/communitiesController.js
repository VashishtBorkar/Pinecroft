// api/controllers/communitiesController.js
import Community from "../models/Community.js";

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
