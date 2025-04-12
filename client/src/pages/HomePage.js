import React, { useState, useEffect } from'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard.js';


function HomePage(){
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log("Home Page");

    const fetchPosts = async () => {
        if (loading || !hasNextPage) return;
    
        setLoading(true);
        try {
          const res = await axios.get(`http://localhost:4000/api/posts?page=${page}&limit=10`);
          const newPosts = res.data.posts;
    
          setPosts((prev) => [...prev, ...newPosts]);
          setHasNextPage(res.data.hasNextPage);
          setPage((prev) => prev + 1);
        } catch (err) {
          console.error("Error fetching posts:", err);
        } finally {
          setLoading(false);
        }
      };
    

    useEffect(() => {
        fetchPosts();
      }, []);

    return (
        <div className="max-w-3xl px-4">
            {/* <h1 className="text-3xl font-bold text-gray-500 text"> Home Page</h1> */}
            {posts.map((post) => (
                <React.Fragment key={post._id}>
                    <PostCard 
                        key={post._id} 
                        post={post}  
                    />
                    <div className="h-px bg-border-color my-4" />
                </React.Fragment>
            ))}

            {loading && (
                <p className="text-center text-gray-400 mt-4">Loading...</p>
            )}

            {!loading && hasNextPage && (
                <button
                onClick={fetchPosts}
                className="block mx-auto mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                Load More
                </button>
            )}

            {!hasNextPage && (
                <p className="text-center text-gray-500 mt-6">You’ve reached the end</p>
            )}
        </div>
    )
}

export default HomePage;