import React from "react";
import { useState, useContext, useEffect, useRef } from "react";


const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
    const modalRef = useRef(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    
    if (!isOpen) return null;

    async function createPost() {

        if (!title || !content) {
            alert("Title and content cannot be empty.");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                console.log("Post created successfully!");
                setTitle("");
                setContent("");
                onSubmit(); // Trigger the parent component's update
                onClose(); // Close the modal
            } else {
                console.error("Failed to create post.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div 
      className="bg-main-bg text-text-color border border-border-color self-center rounded-lg p-6 "
      ref={modalRef}
      //className="bg-background-color p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-text-color">Create a Post</h2>
        
        <input
          type="text"
          placeholder="Title"
          //className="w-full p-2 border rounded mb-2"
          className="p-2 w-full bg-gray-800 rounded-lg items-center mb-2"
        />
        <textarea
          placeholder="Write something..."
          //className="w-full p-2 border rounded mb-4"
          className="p-2 w-full bg-gray-800 rounded-lg items-center mb-2"
        ></textarea>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gray-500 text-white rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
