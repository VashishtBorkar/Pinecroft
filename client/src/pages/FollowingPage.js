// src/pages/FollowingPage.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard.js';
import { UserContext } from '../components/Login/UserContext.js';

function FollowingPage() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch posts from users this user is following
  const fetchFollowingPosts = async () => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/posts/following?page=${page}&limit=10`,
        { withCredentials: true }
      );
      const newPosts = res.data.posts;
      setPosts(prev => {
        const combined = [...prev, ...newPosts];
        const unique = Array.from(new Map(combined.map(p => [p._id, p])).values());
        return unique;
      });
      setHasNextPage(res.data.hasNextPage);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error fetching following posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (!userLoading) {
      if (!Array.isArray(user?.following) || user.following.length === 0) {
        setHasNextPage(false);
        return;
      }
      fetchFollowingPosts();
    }
  }, [userLoading, user.following]);

  if (userLoading) return <div className="text-center text-gray-400 p-8">Loading...</div>;

  if (!Array.isArray(user?.following) || user.following.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400 text-xl">Follow someone to see their posts.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden min-h-screen bg-black">
      <div className="max-w-3xl px-4">
        {posts.map(post => (
          <React.Fragment key={post._id}>
            <PostCard post={post} />
            <div className="h-px bg-border-color my-4" />
          </React.Fragment>
        ))}

        {loading && (
          <p className="text-center text-gray-400 mt-4">Loading...</p>
        )}

        {!loading && hasNextPage && (
          <button
            onClick={fetchFollowingPosts}
            className="block mx-auto mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Load More
          </button>
        )}

        {!hasNextPage && posts.length > 0 && (
          <p className="text-center text-gray-500 mt-6">You’ve reached the end</p>
        )}
      </div>
    </div>
  );
}

export default FollowingPage;