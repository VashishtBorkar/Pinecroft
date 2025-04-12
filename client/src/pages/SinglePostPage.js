import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, ChatBubbleOvalLeftIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "../components/Comment.js";
import PostInteractions from "../components/PostInteractions.js";

function SinglePostPage(){
    const { id } = useParams(); // 👈 get the post ID from the URL
    const [post, setPost] = useState({});
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/posts/${id}`);
          console.log("This is the data", res.data);
          setPost(res.data);
        } catch (err) {
          console.error("Error fetching post", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPost();
    }, [id]);

    async function postComment(e) {
        e.preventDefault();
        if (!commentText.trim()) return;
    
        try {
          const res = await axios.post(
            `http://localhost:4000/api/posts/${id}/comments`,
            { content: commentText },
            { withCredentials: true }
          );
          setPost((prevPost) => ({
            ...prevPost,
            comments: [...prevPost.comments, res.data],
          }));
          setCommentText("");
        } catch (err) {
          console.error("Failed to post comment:", err.response?.data || err.message);
          console.error("Error posting comment ", err);
        }
      }
    
      const handleCancel = () => {
        setCommentText("");
      };


    if (loading) {
        // Show a loading indicator until the post is fully fetched
        return <div>Loading...</div>;
      }

      // console.log("This is the post:", post);


    return (
        <div div className="max-w-3xl px-4">

            {/* Content */}
            <div className="flex items-stretch gap-x-2">
                <button 
                    className="h-8 w-8 p-1 border rounded-full" 
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className=""/>
                </button>
                <div>
                    <img 
                        className="rounded-full text-sm" 
                        alt="profile pic" 
                        url={post.author?.profilePicture} 
                    />
                    <p> {post.author?.username} </p>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-text-color text mt-2 mb-2"> {post.title}</h2>
            <p className="mb-4">
                {post.content}
            </p>

            <PostInteractions post={post} />

            {/* Writing and Posting Comments  */}
            <div className="w-full bg-zinc-800 my-2 rounded-xl p-4 shadow-md">
                <textarea
                    rows={1}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none"
                />
                <div className="flex justify-end gap-2 mt-2">
                    <button
                    onClick={handleCancel}
                    className="px-4 py-1 text-sm text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={postComment}
                    disabled={!commentText.trim()}
                    className="px-4 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    Post
                    </button>
                </div>
            </div>
            
            {/* List of Comments */}
            <div className="space-y-3">
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                    <Comment key={comment._id || index} comment={comment} />
                    ))
                ) : (
                    <div className="flex text-center text-gray-500 text-sm">
                    There are no comments yet.
                    </div>
                )}
            </div>
        </div>
    )
}

export default SinglePostPage;