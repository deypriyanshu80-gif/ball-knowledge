import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { BsStars } from 'react-icons/bs'; 
import { IoMdAdd, IoMdLogOut } from 'react-icons/io'; // Added Logout Icon

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null); // 1. New State for User
  const navigate = useNavigate();

  useEffect(() => {
    // 2. Fetch Blogs
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();

    // 3. Check if User is Logged In
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  // 4. Logout Function
  const handleLogout = () => {
      localStorage.removeItem("user"); // Clear data
      setUser(null); // Reset state
      navigate('/login'); // Go to login
  };

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col items-center p-10">

      
      {/* HEADER SECTION */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-white">BALL KNOWLEDGE ⚽</h1>
            <BsStars size={30} className="text-black" />
        </div>

        {/* USER PROFILE SECTION */}
        {user ? (
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-bold text-lg text-white">Hey, {user.username} 👋</p>
                    <p className="text-xs font-bold text-gray-600 bg-white px-2 py-1 rounded-lg border-2 border-black">
                        Ball Knowledge: {user.ballKnowledge || 0}% 🧠
                    </p>
                </div>
                <button onClick={handleLogout} className="bg-red-500 text-white p-3 rounded-xl border-2 border-black hover:bg-red-600 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <IoMdLogOut size={20} />
                </button>
            </div>
        ) : (
            <div className="flex gap-4">
                <Link to="/login" className="font-bold underline text-lg">Log In</Link>
                <Link to="/signup" className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition">
                    Sign Up
                </Link>
            </div>
        )}
      </div>

      {/* CREATE BUTTON (Only show if logged in!) */}
      {user && (
          <div className="w-full max-w-6xl flex justify-end mb-8">
            <Link to="/create" className="bg-white border-4 border-black px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <IoMdAdd size={24} /> CREATE BLOG
            </Link>
          </div>
      )}

      {/* BLOG GRID */}
      {blogs.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-2xl font-bold mb-4">No blogs found... yet! 📉</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between h-80">
              
              <div>
                <div className="flex justify-between items-start mb-4">
                   <span className="bg-amber-300 px-3 py-1 rounded-full text-xs font-bold border-2 border-black">
                      {blog.category || "General"}
                   </span>
                   <span className="text-gray-500 text-xs font-bold">
                      {new Date(blog.date).toLocaleDateString()}
                   </span>
                </div>

                <h2 className="text-2xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
                <p className="text-gray-600 font-medium text-sm mb-4">By @{blog.author}</p>
                <p className="text-gray-800 line-clamp-3">{blog.content}</p>
              </div>

              <Link to={`/blog/${blog._id}`} className="text-amber-600 font-bold hover:underline mt-4 inline-block">
                Read Full Analysis →
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;