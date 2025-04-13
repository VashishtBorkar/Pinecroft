import {Post, Comment} from "../models/Post.js";

export const addComment = async(req, res) => {
    const { targetId, targetType, voteType} = req.body;
    const { userId } = req.user.id;

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
          upvotes: target.upvotes.length,
          downvotes: target.downvotes.length,
          voteStatus: {
            upvoted: target.upvotes.includes(userId),
            downvoted: target.downvotes.includes(userId),
          },
        });
    
      } catch (err) {
        res.status(500).json({ error: "Voting failed", details: err.message });
      }
    

};