import express from 'express';
import { getUserById, getUserPosts, followUser, searchUsers } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/search', searchUsers);

router.get('/:id', getUserById); // Public user profile
router.get('/:id/posts', getUserPosts); // User's posts

router.put("/:id/follow", verifyToken, followUser);

export default router;


