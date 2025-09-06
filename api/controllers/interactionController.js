import {Post, Comment} from "../models/Post.js";

export const addVote = async(req, res) => {
    const { targetType, voteType} = req.body;
    const targetId = req.params.id;
    const userId = req.user.id;

    try {
        let Model;
        if (targetType === 'post') Model = Post;
        else if (targetType === 'comment') Model = Comment;
        else return res.status(400).json({ error: "Invalid target type" });
    
        const target = await Model.findById(targetId);
        if (!target) return res.status(404).json({ error: "Target not found" });
    
        const hasUpvoted = target.upvotes.includes(userId);
        const hasDownvoted = target.downvotes.includes(userId);
    
        if (voteType === 'upvote') {
          if (hasUpvoted) {
            target.upvotes.pull(userId);
          } else {
            target.downvotes.pull(userId);
            target.upvotes.addToSet(userId);
          }
        } else if (voteType === 'downvote') {
          if (hasDownvoted) {
            target.downvotes.pull(userId);
          } else {
            target.upvotes.pull(userId);
            target.downvotes.addToSet(userId);
          }
        }
    
        await target.save();

        res.status(200).json({
          upVoted: target.upvotes.includes(userId),
          downVoted: target.downvotes.includes(userId),
          voteCount: target.upvotes.length - target.downvotes.length,
        });
    
      } catch (err) {
        res.status(500).json({ error: "Voting failed", details: err.message });
      }
};

export const addComment = async (req, res) => {
    try {
      const userId = req.user?.id;
      const { id: postId } = req.params;
      const { content } = req.body;
  
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
        console.error("Error adding comment:");
        console.error(err); 
        res.status(500).json({ error: "Failed to add comment" });
      }
      
  };