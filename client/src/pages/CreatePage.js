import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePage() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    function createPost(e) {
        console.log("button pressed");
        console.log(e);
        e.preventDefault();

        const data = {title, content: body};
        axios.post('http://localhost:4000/api/posts', data, { withCredentials: true })
        .then(res => {
            console.log("Post created:", res.data);
            const newPostId = res.data._id;
            navigate(`/auth/posts/${newPostId}`);
        })
        .catch(err => {
            console.error("Axios error:", err.response?.data || err.message);
        });
    }

    return (
        <div className="">
            <h2 className="text-3xl font-semibold mb-4">Create Post</h2>

            {/* Tabs */}
            <div className="inline-block border-b border-gray-700 mb-6">
                {["Text", "Images & Video", "Link", "Poll"].map((tab) => (
                    <button
                        key={tab}
                        className="px-4 py-2 text-gray-400 duration-200 group border-b-2 border-transparent transition-colors hover:text-white hover:border-white"
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Title Input */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-3/4 bg-gray-800 text-white border border-gray-600 rounded-2xl p-4  mb-8"
            />

            {/* Body Text area */}
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Body"
                className="w-3/4 bg-gray-800 text-white border border-gray-600 rounded-2xl p-4 h-32 mb-4"
            />

            {/* Action Buttons */}
            <div className="flex space-x-2">
                <button 
                    className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg" 
                    onClick={() => navigate(-1)}>
                    Cancel
                </button>
                <button
                    className={`px-4 py-3 rounded-lg ${
                        title ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"
                    }`}
                    disabled={!title}
                    onClick={createPost}
                    
                >
                    Post
                </button>
            </div>
            
        </div>
    );
}

export default CreatePage;
