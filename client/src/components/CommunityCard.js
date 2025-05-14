import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './Login/UserContext';
import { useNavigate } from 'react-router-dom';
import ButtonCustom from './ ButtonCustom';

function CommunityCard({ _id, name, description, members = [], trending }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [communityMembers, setCommunityMembers] = useState(members);
  const [joined, setJoined] = useState(
    user ? communityMembers.includes(user.id) : false
  );
  const [isJoining, setIsJoining] = useState(false);

  const goToCommunity = () => {
    navigate(`/community/${_id}`);
  }

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
    <div 
      className="bg-transparent rounded-xl p-4 border border-border-color shadow hover:bg-zinc-900 transition duration-200 transform hover:-translate-y-1 hover:shadow-lg"
      onClick={goToCommunity}  
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-white">{name}</h2>
        {trending && <span className="text-yellow-400 text-sm">🔥 Trending</span>}
      </div>
      <p className="text-gray-400 mt-1 line-clamp-2">{description}</p>
      <p className="text-sm text-gray-500 mt-2">{communityMembers.length} members</p>
      <button 
        onClick={handleJoin}
        className="mt-3 px-4 py-1 bg-transparent border text-white rounded-full"
        disabled={isJoining || joined}
      >
        {joined ? "Joined" : "Join"}
      </button>
    </div>
  );
}

export default CommunityCard;
