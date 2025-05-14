import express from 'express';
import { addVote, addComment } from '../controllers/interactionController.js';
import { verifyToken } from '../middleware/verifyToken.js';

// GET /api/communities
const router = express.Router();
router.post("/comment/:id", verifyToken, addComment);
router.put("/vote/:id", verifyToken, addVote);


export default router;
