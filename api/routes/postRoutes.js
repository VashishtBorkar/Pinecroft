import express from 'express';
import { 
    createPost, 
    getAllPosts, 
    getPostById, 
    updatePost, 
    deletePost,
    addComment,
    getPaginatedPosts,
    getPostsByCommunity,
    getFollowingPosts
} from '../controllers/postController.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getPaginatedPosts);  // What should this route be called?


router.get('/community/:id', verifyToken, getPostsByCommunity);

router.get('/following', verifyToken, getFollowingPosts);

router.post('/', verifyToken, createPost);  // Only authenticated users can create posts

//router.get('/', getAllPosts);  // Get all posts
router.get('/:id', getPostById);  // Anyone can view a specific post

router.put('/:id', verifyToken, updatePost);  // Only the author can update
router.delete('/:id', verifyToken, deletePost);  // Only the author can delete

router.post('/:id', verifyToken, deletePost);  // Only the author can delete


router.post('/:id/comments', verifyToken, addComment);  // Only the author can update a comment





export default router;
