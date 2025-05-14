import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function UserCard({ user }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/auth/user/${user._id.toString()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center gap-4 p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
    >
      <img
        src={user.profilePicture || "/default-profile-pic-pinecroft.jpg"}
        alt={user.username}
        className="w-12 h-12 rounded-full object-cover"
      />
      <span className="text-white font-medium">{user.username}</span>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profilePicture: PropTypes.string
  }).isRequired
};
