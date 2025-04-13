import PostInteractions from "./PostInteractions";
import { useNavigate } from "react-router-dom";
import Username from "./Username";
import { formatDistanceToNowStrict } from 'date-fns';

function PostCard({ post, showHeader=true }) {
  const navigate = useNavigate();

  const goToPost = () => {
    navigate(`/auth/posts/${post._id}`);
  };

  const goToAuthor = (e) => {
    e.stopPropagation(); // Prevents bubbling to the card click
    navigate(`/auth/user/${post.author._id}`);
  };

    return (
      <div 
        className="cursor-pointer bg-transparent rounded-xl shadow-md p-4 mb-4 hover:bg-zinc-900 transition duration-200 transform hover:-translate-y-1 hover:shadow-lg"
        onClick={goToPost}
      >
        {/* Header of post containing author, profile pic, date posted */}
        {showHeader && (
          <div className="flex items-center gap-1 mb-2 ">
            <img
              src={post.author?.profilePicture || "/default-profile-pic-pinecroft.jpg"}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-1.5"
            />
            <Username username={post.author?.username} userId={post.author?._id} />
            <span className="text-xs text-gray-400">
              • {formatDistanceToNowStrict(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-white mb-1">{post.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-3 mb-2">{post.content}</p>
        <PostInteractions post={post} />
      </div>
    );
  }
  export default PostCard;
  