import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";


function ProfilePage() {
    const { id } = useParams(); // Assuming you're routing with /user/:userId
    const [user, setUser] = useState(null);
    const [tab, setTab] = useState("posts"); // "overview", "posts", or "comments"
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get(`http://localhost:4000/api/users/${id}`);
            setUser(res.data);
          } catch (err) {
            console.error("Failed to fetch user", err);
          }
        };
    
        const fetchUserPosts = async () => {
          try {
            const res = await axios.get(`http://localhost:4000/api/users/${id}/posts`);
            setUserPosts(res.data.posts || []);
          } catch (err) {
            console.error("Failed to fetch user posts", err);
          }
        };
    
        fetchUser();
        fetchUserPosts();
      }, [id]);
    
      return (
        <div className="max-w-3xl flex flex-col">
          {/* Profile Header */}
          {user && (
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user.profilePicture} // Fallback image
                alt={`${user.username}'s profile`}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <h2 className="text-3xl font-bold">{user.username}</h2>
            </div>
          )}

          {/* Tab Bar */}
          <div className="flex border-b">
            {["overview", "posts", "comments"].map((item) => (
              <button
                key={item}
                className={`px-4 py-2 font-medium ${
                  tab === item ? "border-b-2 border-black" : "text-gray-500"
                }`}
                onClick={() => setTab(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="mt-4">
            {tab === "overview" && (
              <div className="text-gray-400 italic">Overview coming soon...</div>
            )}

            {tab === "posts" && (
              <div className="space-y-4">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} showHeader={false}/>
              ))}
              </div>
            )}

            {tab === "comments" && (
              <div className="text-gray-400 italic">Comments coming soon...</div>
            )}
          </div>
            
        </div>
      )
}

export default ProfilePage;