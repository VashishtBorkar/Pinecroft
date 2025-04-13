import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './Login/UserContext';

function CommunityCard({ _id, name, description, members = [], trending }) {
  const { user } = useContext(UserContext);
  const [communityMembers, setCommunityMembers] = useState(members);
  const [joined, setJoined] = useState(
    user ? communityMembers.includes(user.id) : false
  );
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    if (!user) {
      alert("Please log in to join a community.");
      return;
    }
    setIsJoining(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/communities/${name}/join`,
        { userId: user._id }
      );
      // Update the local members state based on the API response
      setCommunityMembers(response.data.members);
      setJoined(true);
    } catch (error) {
      console.error("Failed to join community:", error.response?.data || error.message);
    }
    setIsJoining(false);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 shadow hover:shadow-lg hover:bg-gray-800 transition duration-200">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-white">{name}</h2>
        {trending && <span className="text-yellow-400 text-sm">🔥 Trending</span>}
      </div>
      <p className="text-gray-400 mt-1">{description}</p>
      <p className="text-sm text-gray-500 mt-2">{communityMembers.length} members</p>
      <button 
        onClick={handleJoin}
        className="mt-3 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={isJoining || joined}
      >
        {joined ? "Joined" : "Join"}
      </button>
    </div>
  );
}

export default CommunityCard;
