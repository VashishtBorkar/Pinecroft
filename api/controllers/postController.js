import {Post, Comment} from "../models/Post.js";
import User from "../models/User.js";


export const createPost = async (req, res) => {
    console.log("creating post");
    try{
        console.log("Creating post with author:", req.user);  // Debug log to ensure req.user is populated
        const {title, content} = req.body;
        const newPost = new Post({
            title,
            content,
            author: req.user.id
        });

        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};

export const getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate('author', 'username');  // Fetch posts with author info
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error getting posts", error });
    }
};

export const getPostById = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id).populate('author', 'username profilePicture')
        .populate({
            path: 'comments',
            populate: { path: 'author', select: 'username profilePicture' }
          });

        if (!post) return res.status(404).json({ message: "Post not found" });

        res.status(200).json(post);
    } catch (error) {
        console.error("🔥 Error in getPostById:", error);  // 👈 log full stack trace
        res.status(500).json({ message: "Error getting post by id", error });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You can only update your own posts' });
        }

        const { title, content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Error updating post' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You can only delete your own posts' });
        }
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
    }
};

// controllers/postController.js (or wherever it lives)
export const addComment = async (req, res) => {
    try {
      const userId = req.user?.id;
      const { id: postId } = req.params;
      const { content } = req.body;
  
      console.log("💬 Adding comment:");
      console.log("🔑 userId:", userId);
      console.log("📝 postId:", postId);
      console.log("📄 content:", content);
  
      if (!userId || !content) {
        return res.status(400).json({ error: "Missing user or comment content" });
      }
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const comment = await Comment.create({
        content,
        author: userId,
        postId,
      });
  
      post.comments.push(comment._id);
      await post.save();
  
      await comment.populate("author", "username");
  
      res.status(201).json(comment);
    } catch (err) {
        console.error("🔥 Error adding comment:");
        console.error(err); // 👈 LOG FULL ERROR OBJECT
        if (err.name === "ValidationError") {
          console.error("📋 Validation errors:");
          for (const field in err.errors) {
            console.error(` - ${field}: ${err.errors[field].message}`);
          }
        }
        res.status(500).json({ error: "Failed to add comment" });
      }
      
  };

export const getPaginatedPosts = async (req, res) => { 
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find()
         .sort({ createdAt: -1 })
         .limit(limit)
         .skip(startIndex)
         .populate('author', 'username');

        res.status(200).json({
          posts,
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        });
      } catch (error) {
        res.status(500).json({ message: "Error getting paginated posts", error });
      }
    };
