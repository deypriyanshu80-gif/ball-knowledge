import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateBlog = () => {
  const [category, setCategory] = useState("Opinion");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  
  const navigate = useNavigate();

  // This is the new logic that talks to your Backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    // 1. Validation
    if (!title || !content || !author) {
      toast.error("Please fill in all fields!");
      return;
    }

    // 2. Prepare Data
    const newBlog = {
      title,
      content,
      author,
      category,
      
    };

    try {
      // 3. Send to Server (Port 5000)
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        toast.success("Blog Published Successfully! ☁️");
        
        // Clear the form
        setTitle("");
        setContent("");
        setAuthor("");

        // Wait 1.5 seconds so user sees the success message, then go Home
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error("Failed to save blog.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error. Is the backend running?");
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col p-10">
      

      <Link to="/" className="text-gray-600 hover:text-black mb-5 font-bold">
        ← Back to Home
      </Link>

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border-4 border-black w-full">
        
        <h1 className="text-5xl font-bold mb-8 text-center">CREATE A NEW POST ⚽</h1>

    
        <div className="mb-6">
          <label className="block text-2xl font-bold mb-2">Blog Title</label>
          <input
            type="text"
            placeholder="Barca is best"
            className="w-full border-2 border-gray-400 p-4 rounded-xl text-xl outline-none focus:border-amber-500 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

    
        <div className="flex justify-between items-center mb-6 gap-4">
          
         
          <div className="w-1/2">
            <label className="block text-2xl font-bold mb-2">Author Name</label>
            <input 
              type="text"
              placeholder="Type your name"
              className="w-full border-2 border-gray-400 p-4 rounded-xl text-xl outline-none focus:border-amber-500 mt-1"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

        
          <div className="w-1/2">
            <label className="block text-2xl font-bold mb-2">Category</label>
            <select
              className="w-full border-2 border-gray-400 p-4 rounded-xl text-xl outline-none focus:border-amber-500 bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Opinion</option>
              <option>Match Analysis</option>
              <option>Transfer News</option>
              <option>Player Stats</option>
            </select>
          </div>
        </div>

       
        <div className="mb-6">
          <label className="block text-2xl font-bold mb-2">Content</label>
          <textarea
            placeholder="Write your analysis..."
            className="w-full border-2 border-gray-400 p-4 rounded-xl text-xl outline-none focus:border-amber-500 h-64"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

       
        <div className="flex justify-center">
          <button 
            onClick={handleSubmit} 
            className="bg-amber-300 text-3xl font-bold py-4 rounded-xl border-2 border-black hover:bg-amber-400 transition mt-4 px-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            PUBLISH
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateBlog;