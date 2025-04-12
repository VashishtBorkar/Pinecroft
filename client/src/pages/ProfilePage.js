import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";

function ProfilePage() {
    const { userId } = useParams(); // Assuming you're routing with /user/:userId
    const [user, setUser] = useState(null);
    const [tab, setTab] = useState("posts"); // "overview", "posts", or "comments"
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get(`http://localhost:4000/api/users/${userId}`);
            setUser(res.data);
          } catch (err) {
            console.error("Failed to fetch user", err);
          }
        };
    
        const fetchUserPosts = async () => {
          try {
            const res = await axios.get(`http://localhost:4000/api/users/${userId}/posts`);
            setUserPosts(res.data.posts || []);
          } catch (err) {
            console.error("Failed to fetch user posts", err);
          }
        };
    
        fetchUser();
        fetchUserPosts();
      }, [userId]);
    

    <div className="flex items-center gap-6 mb-6">
      <img
        src={user?.profilePicture || "/default-profile-pic-pinecroft.jpg"}
        alt="profile"
        className="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h2 className="text-3xl font-bold text-white">{user?.username}</h2>
        {/* You can add other info here later, like join date or bio */}
      </div>
    </div>
}

export default ProfilePage;