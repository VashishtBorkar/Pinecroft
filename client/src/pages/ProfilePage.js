import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/Login/UserContext";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import UserCard from "../components/UserCard";
import CommunityCard from "../components/CommunityCard";
import CommunityListItem from "../components/CommunityListItem";


function ProfilePage() {
    const {user, loading} = useContext(UserContext);
    const { id } = useParams(); // Assuming you're routing with /user/:userId

    const [profileUser, setProfileUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [following, setFollowing] = useState();
    const [communities, setCommunities] = useState([]);
    const [tab, setTab] = useState("posts"); // "followers", "posts", or "communities"

    const fetchProfile = useCallback(async () => {
      try {
        const {data: fetchedUser} = await axios.get(`http://localhost:4000/api/users/${id}`, { withCredentials: true });
        setProfileUser(fetchedUser);

        const myId = (user._id ?? user.id).toString();
        const followerIds = Array.isArray(fetchedUser.followers) 
          ? fetchedUser.followers.map(f => f._id.toString())
          : [];

        setFollowing(followerIds.includes(myId));
        setCommunities(fetchedUser.communities);

      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }

    }, [id, user]);

    const fetchPosts = useCallback(async () => {
      try {
        const {data} = await axios.get(`http://localhost:4000/api/users/${id}/posts`);
        setUserPosts(data.posts || []);
      } catch (err) {
        console.error("Failed to fetch user posts", err);
      }
    }, [id]);

    useEffect(() => {
      fetchProfile();
      fetchPosts();
    }, [fetchProfile, fetchPosts]);

    const toggleFollow = async () => {
      try {
        const response = await axios.put(`http://localhost:4000/api/users/${id}/follow`, {}, { withCredentials: true });
        setFollowing(prevFollowing => !prevFollowing);
        fetchProfile();

        if (!response.data || response.status !== 200) {
          // Something went wrong, revert the optimistic update
          setFollowing(prevState => !prevState);
          console.error("Follow toggle returned unexpected response");
        }
    

      } catch (err) {
        console.error("Failed to toggle follow:", err);
      }
    };


    const currentUserId = (user?._id ?? user?.id)?.toString();
    const profileUserId = profileUser?._id?.toString();
    const isOwnProfile = currentUserId && profileUserId === currentUserId;

    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="max-w-3xl flex flex-col">
        {/* Profile Header */}
        {profileUser && (
          <div className="flex justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={profileUser.profilePicture} // Fallback image
                alt={`${profileUser.username}'s profile`}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <h2 className="text-3xl font-bold">{profileUser.username}</h2> 
            </div>
            {/* Follow Button */}

            {!isOwnProfile && (
              <button
                className={`border-2 rounded-full px-4 py-2 font-bold transition ${
                  following
                    ? "border-red-400 text-red-400 hover:bg-red-200"
                    : "border-green-400 text-green-400 hover:bg-green-200"
                }`}
                onClick={toggleFollow}
              >
                {following ? "Unfollow" : "Follow"}
              </button> 
            )}
          </div>
        )}

        {/* Tab Bar */}
        <div className="flex border-b">
        {[
          { key: 'followers', label: 'Followers' },
          { key: 'posts', label: 'Posts' },
          { key: 'communities', label: 'Communities' }
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`px-4 py-2 font-medium ${
              tab === key ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

        {/* Content Area */}
        <div className="mt-4 space-y-4">
        {tab === 'followers' && (
          profileUser.followers.length > 0 ? (
            profileUser.followers.map((follower) => (
              <UserCard key={follower._id} user={follower} />
            ))
          ) : (
            <div className="text-gray-400 italic">No followers yet</div>
          )
        )}

        {tab === 'posts' && (
          userPosts.length > 0 ? (
            <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} showHeader={false} />
            ))}
          </div>
          ) : (
            <div className="text-gray-400 italic">No posts yet</div>
          )
        )}

        {tab === 'communities' && (
          communities.length > 0 ? (
            <div className="space-y-4">
            {communities.map((c) => (
              <CommunityListItem
              key={c._id}
              _id={c._id}
              name={c.name}
              members={c.members}
            />
            ))}
          </div>
          ) : (
            <div className="text-gray-400 italic">No part of any communities</div>
          )
        )}
      </div>
          
      </div>
    )
}

export default ProfilePage;