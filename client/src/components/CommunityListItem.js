import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './Login/UserContext';
import { useNavigate } from 'react-router-dom';


function CommunityListItem( { _id, name, members } ) {
    const navigate = useNavigate();
    const [isJoining, setIsJoining] = useState(false);

    const goToCommunity = () => {
        navigate(`/community/${_id}`);
    }
    return(
    <div 
      className="bg-transparent rounded-xl p-4 border border-border-color shadow hover:bg-zinc-900 transition duration-200 transform hover:-translate-y-1 hover:shadow-lg"
      onClick={goToCommunity}  
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-white">{name}</h2>
      </div>
      <p className="text-sm text-gray-500 mt-2">{members.length} members</p>
    </div>
    );
}

export default CommunityListItem