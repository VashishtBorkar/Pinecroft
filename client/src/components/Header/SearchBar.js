// src/components/Header/SearchBar.js
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch search results with debounce
  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/users/search`,
          { params: { q: query }, withCredentials: true }
        );
        setResults(res.data);
      } catch (err) {
        console.error('Error searching users:', err);
      } finally {
        setLoading(false);
        setShowDropdown(true);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (id) => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    navigate(`/auth/user/${id}`);
  };

  return (
    <div ref={containerRef} className="relative flex-grow flex max-w-lg justify-center">
      <form
        onSubmit={e => e.preventDefault()}
        className="flex p-1 w-full max-w-lg bg-zinc-800 rounded-full items-center"
      >
        <MagnifyingGlassIcon className="h-4 w-4 ml-2 text-text-color" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => query && setShowDropdown(true)}
          className="h-7 px-2 bg-transparent text-text-color text-sm w-full"
          placeholder="Search users"
        />
      </form>

      {showDropdown && results.length > 0 && (
        <ul className="absolute top-full mt-1 w-full max-w-lg bg-zinc-800 border border-zinc-600 rounded-lg shadow-lg z-50">
          {loading && <li className="px-4 py-2 text-gray-400">Loading...</li>}
          {!loading && results.map(user => (
            <li
              key={user._id}
              onClick={() => handleSelect(user._id)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 cursor-pointer"
            >
              <img
                src={user.profilePicture || '/default-profile-pic-pinecroft.jpg'}
                alt={user.username}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-text-color text-sm">{user.username}</span>
            </li>
          ))}
          {!loading && results.length === 0 && (
            <li className="px-4 py-2 text-gray-400">No users found</li>
          )}
        </ul>
      )}
    </div>
  );
}
