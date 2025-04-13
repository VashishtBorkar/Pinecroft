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
        <div className="max-w-3xl">
            <h1 className="  text-3xl font-bold text-gray-500 text"> Profile Page </h1>
            {user && <h2>{user.username}</h2>}
            {userPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      )
    
}

export default ProfilePage;