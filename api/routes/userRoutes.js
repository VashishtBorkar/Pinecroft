import express from 'express';
import { getUserById, getUserPosts } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserById); // Public user profile
router.get('/:id/posts', getUserPosts); // User's posts

export default router;
