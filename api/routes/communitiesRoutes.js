import express from 'express';
import { getAllCommunities, createCommunity, joinCommunity } from '../controllers/communitiesController.js';

// GET /api/communities
const router = express.Router();
router.get("/", getAllCommunities);
router.post("/", createCommunity);
router.post("/:communityId/join", joinCommunity); // Join a community


export default router;
