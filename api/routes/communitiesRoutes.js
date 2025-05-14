import express from 'express';
import { getAllCommunities, createCommunity, joinCommunity, getCommunity, toggleMembership } from '../controllers/communitiesController.js';
import { verifyToken } from '../middleware/verifyToken.js';

// GET /api/communities
const router = express.Router();
router.get("/", getAllCommunities);
router.post("/", createCommunity);
router.post("/:communityId/join", joinCommunity); // Join a community
router.get("/:id", getCommunity);  // Get a specific community)
router.put("/:id/membership", verifyToken, toggleMembership);


export default router;
